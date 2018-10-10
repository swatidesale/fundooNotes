import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        password: '',
        message: '',
        status: false
      },
      submitted: false,
      users: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    axios.post('/api/users/login', { username, password })
      .then((result) => {
        if(result.data.success === false) {
          this.setState({ message: result.data.msg });
          this.setState({status: true});
          history.push("/login");
        }
        else {
          localStorage.setItem('username',result.data.data.username);
          var user = result.data.data.firstname+" "+result.data.data.lastname;
          localStorage.setItem('user',user);
          localStorage.setItem('userKey',result.data.data._id);
          this.setState({ message: '' });
          this.setState({status: false });
          window.location.href='/home/notes';
        }
      });
  }

  forgotPassword() {
    const { username } = this.state;
    axios.post('/api/users/forgot',{username})
        .then((result) => {
          if(result.data.success === false) {
            this.setState({ message: result.data.msg });
            this.setState({status: true});
            history.push("/login");
          }
          else {
            this.setState({ message: result.data.msg });
            this.setState({status: true});
            console.log("TOken....",result.data.token);
            localStorage.setItem('resetToken',result.data.token);
            history.push("/login");
          }
    });
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div>
        <form>         
          {this.state.status ?
            <div id="display-login-failed">
              { message }
            </div>
            : 
            null
          }
          <Card className="card">
            <header>
              <div className="title">
                <h1>Login</h1>
              </div>
            </header>
          
            <div className="container">
                <CardContent>
                  <TextField
                    style={{width:200}}
                    id="username"
                    label="Username"
                    type="text"
                    margin="normal"
                    required
                    onChange={this.handleChange} value={username}
                  />
                  <br />

                  <TextField
                    style={{width:200}}
                    id="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    required
                    onChange={this.handleChange} value={password}
                  />
                  <br />
                </CardContent>

                <CardActions className="logincardAction">
                  <Button className="actions" onClick={this.handleSubmit} variant="contained" color="primary">
                    Login
                  </Button>

                  <Button className="actions" variant="contained" href='/register'>
                    Register
                  </Button>
                </CardActions>

                <div className="forgotPwd">
                  <Button color="primary" className="forgotPwdBtn" onClick={this.forgotPassword}>
                    Forgot Password?
                  </Button>
                </div>
            </div>
          </Card>
        </form>
      </div>
    );
  }
}

export default LoginPage;