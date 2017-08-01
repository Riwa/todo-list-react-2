import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
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
        userId: localStorage.getItem('userId')
      }
    }

    this.handleChangeCurrentPwd = this.handleChangeCurrentPwd.bind(this);
    this.handleChangeNewPwd = this.handleChangeNewPwd.bind(this);
    this.proceedToPasswordChange = this.proceedToPasswordChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChangeCurrentPwd(event) {
    let newPassword = Object.assign({}, this.state.newPassword);
    newPassword.currentPwd = event.target.value;
    this.setState({ newPassword: newPassword });
  }

  handleChangeNewPwd(event) {
    let newPassword = Object.assign({}, this.state.newPassword);
    newPassword.newPwd = event.target.value;
    this.setState({ newPassword: newPassword });
  }

  componentDidMount() {
    console.log(this.state.user)
    axios.get(`http://92.222.88.131:9000/settings/${this.state.user}`).then((response) => {
      this.setState({ loggedUser: response.data[0] })
    })
  }

  proceedToPasswordChange() {
    axios.post('http://92.222.88.131:9000/changePassword', this.state.newPassword).then((response) => {
      console.log('Password changed from' + this.state.newPassword.currentPwd + 'to' + this.state.newPassword.newPwd)
    })
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    this.props.history.push('/')
    window.location.reload()
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
                type="password"
                fullWidth={true}
                floatingLabelText="Mot de passe actuel"
                onChange={this.handleChangeCurrentPwd}
              />
            </div>
            <div>
              <TextField
                value={this.state.newPassword.newPwd}
                type="password"
                fullWidth={true}
                floatingLabelText="Nouveau mot de passe"
                onChange={this.handleChangeNewPwd}
              />
            </div>
          </CardText>
          <CardActions className="change-password-button">
            <FlatButton onClick={this.proceedToPasswordChange} label="Confirmer le changement" />
          </CardActions>
        </Card>
        <Card className="logout-button">
          <CardActions>
            <FlatButton onClick={this.logout} label="Se déconnecter"> <LogoutButton />  </FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default AccountSettings;