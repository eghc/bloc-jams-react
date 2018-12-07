import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Library from './components/Library';
import Landing from './components/Landing';
import Album from './components/Album';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  render() {
    return (
      <div className="App">

        <header>
        <AppBar position="static" color='primary'>
          <Toolbar>

           <Button color="inherit" component={Link} to="/">
            <Typography variant='display1' color="inherit" align='center'>
              Bloc Jams
            </Typography>
          </Button>

          <Button color="inherit" component={Link} to="/library">
            Library
          </Button>

         </Toolbar>
        </AppBar>

        </header>
        <main>
          <Route exact path ='/' component={Landing}/>
          <Route path='/library' component={Library}/>
          <Route path='/album/:slug' component={Album}/>
        </main>
      </div>
    );
  }
}

export default App;
