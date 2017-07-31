import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/navigation/arrow-back';
import {Link} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios'

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskId: props.match.params.id,
      taskDetails: {}
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:9000/details/${this.state.taskId}`).then((response) => {
      console.log(response.data)
      this.setState({ taskDetails: response.data[0] })
      console.log(this.state.taskDetails.task)
    })
  }

  completeTask(taskId) {
    axios.put(`http://localhost:9000/completeTask/${taskId}`).then((response) => {
      let updateTask = Object.assign({}, this.state.taskDetails);
      this.componentDidMount();
    })
  }

  deleteTask(taskId) {
    axios.delete(`http://localhost:9000/deleteTask/${taskId}`).then((response) => {
      this.props.history.goBack()
    })
  }

  isCompleted() {
    let completed;
    if (this.state.taskDetails.completed === true) {
      completed = <FlatButton onClick={() => this.deleteTask(this.state.taskDetails.id)} label="Supprimer" />
    } else {
      completed = <FlatButton onClick={() => this.completeTask(this.state.taskDetails.id)} label="Valider" />
    }
    return completed
  }

  render() {
    return (
      <Card>
        <IconButton onClick={() => this.props.history.goBack()} label="Retour"><BackButton /></IconButton>
        <CardHeader
          title={this.state.taskDetails.task}
          subtitle={'Créé le ' + this.state.taskDetails.created}
          actAsExpander={true}
          showExpandableButton={false}
        />
        <CardText>
          {this.state.taskDetails.details}
        </CardText>
        <CardActions>
          {this.isCompleted()}
        </CardActions>
      </Card>
    );
  }
}

export default Details;