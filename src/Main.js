import React, { Component } from 'react';
import TodoList from './TodoList'
import DoneList from './DoneList'
import UrgentList from './UrgentList'
import Details from './Details'
import Add from './Add'
import Login from './Login'
import AccountSettings from './AccountSettings'
import { Route, Switch } from 'react-router-dom'

class Main extends Component {

  render() {
    return (
      <div style={{
        paddingBottom:"10vh",
        boxSizing:"border-box",
        height:"90vh",
        overflowX:"auto"
      }}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/todo' component={TodoList} />
          <Route path='/urgent' component={UrgentList} />
          <Route path='/done' component={DoneList} />
          <Route path='/add' component={Add} />
          <Route path='/details/:id' component={Details} />
          <Route path='/settings' component={AccountSettings} />
        </Switch>
      </div>
    );
  }
}

export default Main;