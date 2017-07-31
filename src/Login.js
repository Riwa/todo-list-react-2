import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test: 1,
            login: {
                user: '',
                password: ''
            }
        }

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.proceedToLogin = this.proceedToLogin.bind(this);
    }

    handleChangeLogin(event) {
        let login = Object.assign({}, this.state.login);
        login.user = event.target.value;
        this.setState({ login: login });
    }

    handleChangePassword(event) {
        let login = Object.assign({}, this.state.login);
        login.password = event.target.value;
        this.setState({ login: login });
    }

    proceedToLogin(){
        axios.post('http://localhost:9000/proceedToLogin', this.state.login).then((response) => {
            console.log(response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.id)
            this.props.history.push('/todo')
        })
    }

    render(){
        return(
            <div>
            <div>
                <TextField
                    value={this.state.login.user}
                    fullWidth={true}
                    floatingLabelText="Nom d'utilisateur"
                    onChange={this.handleChangeLogin}
                />
            </div>
            <div>
                <TextField
                    value={this.state.login.password}
                    type="password"
                    fullWidth={true}
                    floatingLabelText="Mot de passe"
                    onChange={this.handleChangePassword}
                />
            </div>
            <RaisedButton onClick={this.proceedToLogin} label="Se connecter" primary={true} />
            </div>
        )
    }
}

export default Login;