import React, { Component }from 'react';
import {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    justifyContent: 'center'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class PlayerBar extends Component {

  render() {
    const {classes} = this.props;
    return (
      <AppBar position="fixed" color="primary" className={classes.appBar} >
        <Toolbar>
        <div className={classes.grow} />

          <div className="current-time">{this.props.currentTime}</div>
           <input
             type="range"
             className="seek-bar"
             value={(this.props.currentTime / this.props.duration) || 0}
             max="1"
             min="0"
             step="0.01"
             onChange ={this.props.handleTimeChange}
           />
           <div className="total-time">{this.props.duration}</div>

         <div className={classes.grow} />
          <Button color="inherit" onClick={this.props.handlePrevClick}>
            <span className="icon ion-md-skip-backward"></span>
          </Button>
          <Button color="inherit" onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
          </Button>
          <Button color="inherit" onClick={this.props.handleNextClick}>
            <span className="icon ion-md-skip-forward"></span>
          </Button>
          <div className={classes.grow} />
             <div className="icon ion-md-volume-low"></div>
             <input
              type="range"
              className="seek-bar"
              max="1"
              min="0"
              step="0.05"
              value={this.props.volume}
              onChange={this.props.handleVolumeChange}
              />
             <div className="icon ion-md-volume-high"></div>
           <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    );
  }
}
PlayerBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerBar);
