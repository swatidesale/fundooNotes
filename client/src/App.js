import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import RegisterPage  from './components/pages/RegisterPage';
import LoginPage  from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import NotePage from './components/notes/Note';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import ArchiveNotesPage from './components/notes/actions/ArchiveNotes';
import TrashNotes from './components/notes/actions/TrashNotes';
import ReminderNotes from './components/notes/actions/ReminderNotes';
// import SearchNotes from './components/notes/actions/SearchNotes';
import { createBrowserHistory } from 'history';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return(
      <div>
        <Router history={history}>
          <div>
            <Route  exact path='/' render={() => (<Redirect to='/login'/>)}/>
              <Route  path='/login' component={LoginPage}/>
              <Route  path='/register' component={RegisterPage}/>
              <Route path='/resetPassword' component={ResetPasswordPage}/>
              <Route  path='/home' component={HomePage}>
                <Route  path='/note' component={NotePage}/>
                <Route  path='/archive' component={ArchiveNotesPage}/>
                <Route  path='/trash' component={TrashNotes}/>
                <Route  path='/reminder' component={ReminderNotes}/>
                {/* <Route path='/search' component={SearchNotes}/> */}
              </Route> 
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
