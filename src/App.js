import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import Main from './Main'

injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <TopBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <BottomBar />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
