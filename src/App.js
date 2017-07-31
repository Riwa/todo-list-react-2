import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import Main from './Main'

injectTapEventPlugin();

class App extends Component {

  componentDidMount(){
    console.log(window.location)
  }

  displayTopBar(){
    let path = window.location.hash;
    if(path !== '#/'){
      return <MuiThemeProvider>
          <TopBar />
        </MuiThemeProvider>
    }
  }


  displayBottomBar(){
    let path = window.location.hash;
    if(path !== '#/'){
      return <MuiThemeProvider>
          <BottomBar />
        </MuiThemeProvider>
    }
  }


  render() {
    return (
      <div>
        {this.displayTopBar()}
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
        {this.displayBottomBar()}
      </div>
    );
  }
}

export default App;
