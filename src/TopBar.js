import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AddTaskButton from 'material-ui/svg-icons/content/add';
import HomeButton from 'material-ui/svg-icons/action/home';
import Snackbar from 'material-ui/Snackbar'
import Drawer from 'material-ui/Drawer';
import Add from './Add'
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

    handleToggle = () => this.setState({ open: !this.state.open });

    // openAddTaskSnack() {
    //     this.setState({ openSnack: true })
    // }

    // handleCloseSnack = () => {
    //     this.setState({openSnack: false})
    // };

    render() {
        return (
            <div>
                <AppBar
                    title="Vos tâches"
                    iconElementRight={<IconButton className="top-bar-link"> <Link to="/add"><AddTaskButton color="white" /></Link></IconButton>} 
                    iconElementLeft={<IconButton className="top-bar-link" onClick={this.previousScreen}><Link to="/"><HomeButton color="white" /></Link></IconButton>} 
                    />
                <Snackbar
                    open={this.state.openSnack}
                    message="Task added"
                    autoHideDuration={4000}
                    onRequestClose={this.handleCloseSnack}
                />
            </div>
        );
    }
}

export default TopBar;
