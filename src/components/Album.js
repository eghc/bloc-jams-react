import React, {Component} from 'react';
import albumData from './../data/album.js';
import PlayerBar from './PlayerBar.js';

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
      isPlaying: false,
      display: display
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src= album.songs[0].audioSrc;
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
    let display = this.state.display.slice();
    if(isSameSong && this.state.isPlaying){
      display[index] = 'icon ion-md-pause';
    }else{
      display[index] = 'icon ion-md-play';
    }
    this.setState({display:display});
  }

  handleSongLeave(song,index){
    const isSameSong = this.state.currentSong === song;
    let display = this.state.display.slice();
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


  render(){
    return(
      <section className = "album">
        <section id ="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover}/>
          <h1 id ="album-title">{this.state.album.title}</h1>
          <h2 className = "artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column"/>
            <col id="song-title-column"/>
            <col id="song-duration-column"/>
          </colgroup>
          <tbody>
          {this.state.album.songs.map((song,index) =>
            <tr className="song" key={index} onMouseLeave={()=>this.handleSongLeave(song,index)} onMouseEnter={() => this.handleSongHover(song,index)} onClick = {() => this.handleSongClick(song, index)}>
              <td>{index+1}</td>
              <td>{song.title}</td>

              {this.state.display[index].indexOf("icon") === -1 ? (
                <td>{this.state.display[index]}</td>
                ):(
                <td><span className={this.state.display[index]}></span></td>
              )}

            </tr>
          )}
          </tbody>
        </table>
        <PlayerBar isPlaying={this.state.isPlaying}
          currentSong = {this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong, this.state.album.songs.findIndex(song => this.state.currentSong === song))}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
        />
      </section>
    );
  }
}

export default Album;
