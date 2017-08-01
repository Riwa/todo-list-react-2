import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import UrgentIcon from 'material-ui/svg-icons/alert/warning'
import DoneIcon from 'material-ui/svg-icons/navigation/check'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
//import './BottomBar.css'

const urgentIcon = <UrgentIcon />;
const doneIcon = <DoneIcon />;
const settingsIcon = <SettingsIcon />;


class BottomBar extends Component {
    state = {
        open: false,
        selectedIndex: 0,
    };
    handleToggle = () => this.setState({ open: !this.state.open });
    select = (index) => this.setState({selectedIndex: index});

    render() {
        return (
            <div id="bottom-bar">
                <Paper zDepth={1}>
                    <BottomNavigation
                        style={{
                            position: 'fixed',
                            bottom: '0',
                            zIndex: 999,
                        }}
                        selectedIndex={this.state.selectedIndex}>
                        <Link to="/urgent">
                            <BottomNavigationItem
                                label="Urgentes"
                                icon={urgentIcon}
                                onTouchTap={() => this.select(0)}
                            />
                        </Link>
                        <Link to="/done">
                            <BottomNavigationItem
                                label="Complètes"
                                icon={doneIcon}
                                onTouchTap={() => this.select(1)}
                            />
                        </Link>
                        <Link to="/settings">
                            <BottomNavigationItem
                                label="Paramètres"
                                icon={settingsIcon}
                                onTouchTap={() => this.select(2)}
                            />
                        </Link>
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default BottomBar;
