import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AddTaskButton from 'material-ui/svg-icons/content/add';
import HomeButton from 'material-ui/svg-icons/action/home';
import './TopBar.css'
import { Link } from 'react-router-dom'

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnack: false,
            open: false,
        };
    }

    render() {
        return (
            <div>
                <AppBar
                    className="top-bar-bkg"
                    style={{backgroundColor: '#465570'}}
                    title="ZOL Tasks Manager"
                    iconElementRight={<IconButton className="top-bar-link"> <Link to="/add"><AddTaskButton color="white" /></Link></IconButton>} 
                    iconElementLeft={<IconButton className="top-bar-link" onClick={this.previousScreen}><Link to="/todo"><HomeButton color="white" /></Link></IconButton>} 
                    />
            </div>
        );
    }
}

export default TopBar;
