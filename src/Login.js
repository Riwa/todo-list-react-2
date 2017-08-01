import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import {Card, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import './Login.css'
import logo from './logo.png'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test: 1,
            open: false,
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
        }).catch((error) => {
                this.setState({open: true,});
      })
    }

    handleRequestClose = () => {
        this.setState({
        open: false,
        });
    };

    render(){
        return(
            <div className="login-panel">
                <div className="logo-login">
                    <img src={logo} alt="logo" />
                    <h1>Tasks Manager</h1>
                </div>
                <Card>
                    <CardText>
                        <TextField
                            value={this.state.login.user}
                            fullWidth={true}
                            floatingLabelText="Nom d'utilisateur"
                            onChange={this.handleChangeLogin}
                        />


                        <TextField
                            value={this.state.login.password}
                            type="password"
                            fullWidth={true}
                            floatingLabelText="Mot de passe"
                            onChange={this.handleChangePassword}
                        />
                    </CardText>
                    <CardActions className="login-button">
                    <FlatButton fullWidth={true} onClick={this.proceedToLogin} label="Se connecter" backgroundColor="#465570" style={{color: "#FFF"}}/>
                    </CardActions>
                </Card>
                <Snackbar
                    open={this.state.open}
                    message="Nom d'utilisateur et/ou mot de passe invalides"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

export default Login;