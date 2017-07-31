import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton';
import LogoutButton from 'material-ui/svg-icons/action/power-settings-new';
import axios from 'axios'
import './AccountSettings.css'

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem('userId'),
      loggedUser: {},
      newPassword: {
        currentPwd: '',
        newPwd: '',
      }
    }
  }

  componentDidMount() {
    console.log(this.state.user)
    axios.get(`http://localhost:9000/settings/${this.state.user}`).then((response) => {
      this.setState({ loggedUser: response.data[0] })
    })
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title="Informations de l'utilisateur"
            subtitle={`${this.state.loggedUser.firstName} ${this.state.loggedUser.lasttName}`} // Beware of the typo
          />
        </Card>
        <Card className="change-password-form">
          <CardHeader
            title="Modifier le mot de passe"
          />
          <CardText>
            <div>
              <TextField
                value={this.state.newPassword.currentPwd}
                fullWidth={true}
                floatingLabelText="Mot de passe actuel"
                onChange={this.handleChangeDetails}
              />
            </div>
            <div>
              <TextField
                value={this.state.newPassword.newPwd}
                fullWidth={true}
                floatingLabelText="Nouveau mot de passe"
                onChange={this.handleChangeDetails}
              />
            </div>
          </CardText>
          <CardActions className="change-password-button">
            <FlatButton label="Confirmer le changement" />
          </CardActions>
        </Card>
        <Card className="logout-button">
          <CardActions>
            <FlatButton label="Se déconnecter"> <LogoutButton />  </FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default AccountSettings;