import React, {Component} from 'react';
import albumData from './../data/album.js';
import PlayerBar from './PlayerBar.js';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    justifyContent: 'center',
    paddingBottom: 75,
    marginLeft: '15%'
  },
  grow: {
    flexGrow: 1,
  },
});

class Album extends Component{
  constructor(props){
    super(props);
    const album = albumData.find(album =>{
      return album.slug === this.props.match.params.slug
    });

    let display = album.songs.map(song => song.duration);
    //console.log(display);
    //let display = new Array(album.songs.length).fill('play');

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.5,
      isPlaying: false,
      display: display
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src= album.songs[0].audioSrc;
    this.audioElement.volume = 0.5;
  }

  play(){
    this.audioElement.play();
    this.setState({isPlaying: true});
  }
  pause(){
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong:song});
  }
  handleSongClick(song,index){
    const isSameSong = this.state.currentSong === song;
    let display = this.state.display.slice();
    if(this.state.isPlaying && isSameSong){
      this.pause();
      display[index] = 'icon ion-md-play';
    }else{
      //console.log("else");
      if(!isSameSong){
        //swtich songs
        this.setSong(song);
        //reset all displays
        display = this.state.album.songs.map(song => song.duration);
      }
      this.play();
      display[index] = 'icon ion-md-pause';
    }
    this.setState({display:display});
  }

  handleSongHover(song,index){
    const isSameSong = this.state.currentSong === song;
    let {display} = this.state;
    if(isSameSong && this.state.isPlaying){
      display[index] = 'icon ion-md-pause';
    }else{
      display[index] = 'icon ion-md-play';
    }
    this.setState({display:display});
  }

  handleSongLeave(song,index){
    const isSameSong = this.state.currentSong === song;
    let {display} = this.state;
    if(isSameSong){
      if(this.state.isPlaying){
        display[index] = 'icon ion-md-pause';
      }else{
        display[index] ='icon ion-md-play';
      }
    }else{
      //display duration
      display[index] = this.state.album.songs[index].duration;
    }
    this.setState({display:display});
  }

  handlePrevClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    if(currentIndex === 0){
      return;
    }
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.handleSongClick(newSong, newIndex);
    this.play();
  }

  handleNextClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    if(currentIndex === this.state.album.songs.length-1){
      return;
    }
    const newIndex = Math.max(0, currentIndex +1);
    const newSong = this.state.album.songs[newIndex];
    this.handleSongClick(newSong, newIndex);
    this.play();
  }

  //Q for mentor: are the next two functions redunant if there is eventListeners?
  handleTimeChange(e){
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({currentTime: newTime});
  }

  handleVolumeChange(e){
    //console.log(e.target.value);
    this.audioElement.volume = e.target.value;
    this.setState({volume: this.audioElement.volume});
  }

  formatTime(t){
    if(t === undefined || t === null || isNaN(t)){
      return "-:--";
    }
    let min = parseInt(t / 60);
    if(min < 10){
      min = "0" + String(min);
    }
    let sec = parseInt(t % 60);
    if(sec < 10){
      sec = "0" + String(sec);
    }

    return min + ":" + sec;
  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate: e =>{
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
         this.setState({duration: this.audioElement.duration});
      },
      volumechange: e =>{
        this.setState({volume: this.audioElement.volume});
      }

    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount(){
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  render(){
    const { classes } = this.props;
    return(
      <section className = "album">
        <section id ="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover}/>
          <Typography component="h2" variant="display2" gutterBottom>{this.state.album.title}</Typography>
          <Typography component="h2" variant="display1" gutterBottom>{this.state.album.artist}</Typography>
          <Typography variant="body1" gutterBottom>{this.state.album.releaseInfo}</Typography>
        </section>

        <Paper alignItems="center" justify="center" className={classes.root}>
          <Table>
            <TableBody>
              {this.state.album.songs.map((song,index) =>
                  <TableRow key={index} onMouseLeave={()=>this.handleSongLeave(song,index)}  onMouseEnter={() => this.handleSongHover(song,index)} onClick = {() => this.handleSongClick(song, index)}>
                    <TableCell>
                      {index+1}
                    </TableCell>
                    <TableCell>{song.title}</TableCell>
                    {this.state.display[index].indexOf("icon") === -1 ? (
                      <TableCell >{this.state.display[index]}</TableCell>
                      ):(
                      <TableCell><span className={this.state.display[index]}></span></TableCell>
                    )}
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <PlayerBar isPlaying={this.state.isPlaying}
          currentSong = {this.state.currentSong}
          currentTime = {this.formatTime(this.audioElement.currentTime)}
          duration = {this.formatTime(this.audioElement.duration)}
          volume = {this.state.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong, this.state.album.songs.findIndex(song => this.state.currentSong === song))}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}
Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
