import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class RegisterPage extends Component {
    constructor() {
       super();

       this.state = {
            user: {
                firstname:'',
                lastname:'',
                username:'',
                password:'',
                confirmPassword:'',
                message: '',
                status: false
            },
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    /**
     * function to register a new user
     * 
    */
    handleSubmit(e) {
        e.preventDefault();
        const { firstname, lastname,username, password, confirmPassword } = this.state;
        
        axios.post('/api/users/register', { firstname, lastname, username, password, confirmPassword})
        .then((result) => {
                if(result.data.success === false) {
                    this.setState({ message: result.data.msg });
                    this.setState({status: true});
                    history.push("/register");
                }
                else {
                    this.setState({ message: '' });
                    this.setState({status: false});
                    window.location.href='/login';
                }
        });
    }

    render() {
        const { message } = this.state;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.state.status ?
                        <div id="display-success">
                            { message }
                        </div>
                        : 
                        null
                    }
                    <Card className="cardRegister">
                        <header>
                            <div className="title">
                                <h1>Register</h1>
                            </div>
                        </header>

                        <div className="containerRegister">
                            <CardContent>
                                <TextField
                                    style={{width:220}}
                                    name="firstname"
                                    id="firstname"
                                    label="First Name"
                                    type="text"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange}  value={this.state.firstname}
                                />
                                <br/>

                                <TextField
                                    style={{width:220}}
                                    name="lastname"
                                    id="lastname"
                                    label="Last Name"
                                    type="text"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.lastname}
                                />
                                <br/>

                                <TextField
                                    style={{width:220}}
                                    name="username"
                                    id="username"
                                    label="Username"
                                    // type="email"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.username}
                                />
                                <br/>

                                <TextField
                                    style={{width:220}}
                                    name="password"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.password}
                                />
                                <br/>

                                <TextField
                                    style={{width:220}}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.confirmPassword}
                                />
                                <br/>
                            </CardContent>

                            <CardActions className="cardAction">
                                <Button className="actions" type="submit" variant="contained" color="primary">
                                    Register
                                </Button>
        
                                <Button className="actions" variant="contained" href='/login'>
                                    Cancel
                                </Button>
                            </CardActions>
                        </div>
                    </Card>
                </form>
            </div>
        );
    }
}

export default RegisterPage;