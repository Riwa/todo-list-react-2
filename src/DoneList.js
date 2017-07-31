import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './DoneList.css'

class DoneList extends Component {
      constructor(props) {
        super(props)

        const tasks = []

        this.state = { tasks }
    }
  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    axios.get('http://localhost:9000/done').then((response) =>{
      this.tasks = response.data;
      this.setState({tasks: this.tasks})
    })
  }

  render() {
    return (
      <div>
        <Subheader>Tâches effectuées</Subheader>
        <List>
          {this.state.tasks.map((task) => (
            <Link className="task-list-item"  key={task.id} to={`/details/${task.id}`}>
              <ListItem key={task.id} primaryText={task.task} rightIcon={<ActionInfo />} />
            </Link>
          ))}
        </List>
      </div>
    );
  }
}

export default DoneList;