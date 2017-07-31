import React, {Component} from 'react'
import TextField from 'material-ui/TextField';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: {
                user: '',
                password: ''
            }
        }
    }
    render(){
        return(
            <div>
            <div>
                <TextField
                    value={this.state.login.user}
                    fullWidth={true}
                    floatingLabelText="Nom d'utilisateur"
                    onChange={this.handleChangeTask}
                />
            </div>
            <div>
                <TextField
                    value={this.state.login.password}
                    type="password"
                    fullWidth={true}
                    floatingLabelText="Mot de passe"
                    onChange={this.handleChangeTask}
                />
            </div>
            </div>
        )
    }
}

export default Login;