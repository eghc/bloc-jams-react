import React, {Component} from 'react';
import albumData from './../data/album.js';

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
      display[index] = 'play';
    }else{
      console.log("else");
      if(!isSameSong){
        //swtich songs
        this.setSong(song);
        //reset all displays
        display = this.state.album.songs.map(song => song.duration);
      }
      this.play();
      display[index] = 'pause';
    }
    this.setState({display:display});
  }

  handleSongHover(song,index){
    const isSameSong = this.state.currentSong === song;
    let display = this.state.display.slice();
    if(isSameSong && this.state.isPlaying){
      display[index] = 'pause';
    }else{
      display[index] = 'play';
    }
    this.setState({display:display});
  }

  handleSongLeave(song,index){
    const isSameSong = this.state.currentSong === song;
    let display = this.state.display.slice();
    if(isSameSong){
      if(this.state.isPlaying){
        display[index] = 'pause';
      }else{
        display[index] ='play';
      }
    }else{
      //display duration
      display[index] = this.state.album.songs[index].duration;
    }
    this.setState({display:display});
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

              {this.state.display[index] !== 'play' && this.state.display[index] !== 'pause' ? (
                <td>{this.state.display[index]}</td>
                ):(
                <td><ion-icon name={this.state.display[index]}></ion-icon></td>
              )}

            </tr>
          )}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
