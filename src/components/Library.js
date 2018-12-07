import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/album';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class Library extends Component{
  constructor(props){
    super(props);
    this.state = {albums: albumData};
  }
  render(){
    return(
      <section className = "library">
        {this.state.albums.map( (album,index) =>
          <div>
            <div>
            <Link to={`/album/${album.slug}`} key={index}>
              <img src={process.env.PUBLIC_URL +  album.albumCover} alt={album.title} />
            </Link>
            </div>
            <div>
            <Button variant="outlined" component={Link} to={`/album/${album.slug}`} key={index}>
              <div>{album.title} -</div>
              <div>- {album.artist} -</div>
              <div>- {album.songs.length} songs</div>
            </Button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Library;
