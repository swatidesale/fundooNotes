import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import ToggleDisplay from 'react-toggle-display';
// import Tooltip from '@material-ui/core/Tooltip';
import SearchBar from 'material-ui-search-bar'
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import menu from '../../assets/icons/menu.svg';
import newmenu from '../../assets/icons/newmenu.svg';
import back from '../../assets/icons/back.svg';
import refresh from '../../assets/icons/refresh.svg';
import listview from '../../assets/icons/listview.svg';
import gridview from '../../assets/icons/gridview.svg';
import googleapp from '../../assets/icons/googleapp.svg';
import notification from '../../assets/icons/notification.svg';
import reminder from '../../assets/icons/reminder.svg';
import notes from '../../assets/icons/note.svg';
import createnewlabel from '../../assets/icons/createlabel.svg';
import trash from '../../assets/icons/trash.svg';
import cancel from '../../assets/icons/cancel.svg';
import archive from '../../assets/icons/archive.svg';
import createlabeldone from '../../assets/icons/createlabeldone.svg';
import Note from '../notes/Note';
import ArchiveNotes from '../notes/actions/ArchiveNotes';
import TrashNotes from '../notes/actions/TrashNotes';
import ReminderNotes from '../notes/actions/ReminderNotes';
import DisplayLabels from '../notes/actions/DisplayLabels';
import DisplayLabelsOnDialog from '../notes/actions/DisplayLabelsOnDialog';
import NoteController from '../../controllers/NoteController';
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const noteCtrl = new NoteController();

class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            background: null,
            show: false,
            open: false,
            user: null,
            username: null,
            title: null,
            labelopen: false,
            newlabel: null,
            viewbtn: true,
            opensearch: false,
            firstletter: null
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleDrawerSearch = this.toggleDrawerSearch.bind(this);
        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.createLabel = this.createLabel.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (window.location.pathname === '/home/notes') {
            this.setState({
                background: {
                    backgroundColor: 'rgb(255, 187, 0)',
                },
                title: 'Google Keep'
            });
        }
        else if (window.location.pathname === '/home/trash') {
            this.setState({
                background: {
                    backgroundColor: 'rgb(99, 99, 99)',
                },
                title: 'Trash'
            });

        }
        else if (window.location.pathname === '/home/archive') {
            this.setState({
                background: {
                    backgroundColor: 'rgb(96, 125, 139)',
                },
                title: 'Archive'
            });
        }
        else if (window.location.pathname === '/home/reminder') {
            this.setState({
                background: {
                    backgroundColor: 'rgb(96, 125, 139)',
                },
                title: 'Reminders'
            });
        }
        else if (window.location.pathname === '/home/search') {
            this.setState({
                background: {
                    backgroundColor: 'rgb(62, 80, 180)',
                },
                title: 'Google Keep'
            });
        }
        
        var userdata = localStorage.getItem('user');
        var res = userdata.slice(0, 1);
        var userfirstletter = res.toLowerCase();
        this.setState({
            firstletter: userfirstletter
        })
    }

    handleViewClick() {
        this.setState({
            viewbtn: !this.state.viewbtn
        });
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        });

        var userdata = localStorage.getItem('user');
        var email = localStorage.getItem('username');

        this.setState({
            user: userdata,
            username: email
        });
    }

    toggleDrawer() {
        this.setState({
            open: !this.state.open
        });
    }

    toggleDrawerSearch() {
       window.location.href= '/home/notes';
    }

    logout() {
        localStorage.removeItem('jwtToken');
        window.location.href='/login';
    }

    handleClickOpen = () => {
        this.setState({ labelopen: true });
    };

    handleClickClose = () => {
        this.setState({ labelopen: false });
    };

    createLabel() {
        const { newlabel } = this.state;
        const userId = localStorage.getItem('userKey');
        if( newlabel !== null ) {
            axios.post('/api/labels/labels', { userId, newlabel })
            .then((result) => {
                if(result.data.success === false) {
                    console.log("Inside if");
                }
                else {
                    history.push("/home/notes");
                }
            });
        }
    }

    refreshPage() {
        window.location.reload();
    }

    goToSearch() {
        window.location.href='/home/search';
    }

    render() {
        return (
            <div className="rootdiv">
                <MuiThemeProvider>
                    <AppBar position="static">
                        <Toolbar className="dashboard" style={this.state.background}>
                            {
                                (window.location.pathname === '/home/search') && 
                                <IconButton style={{ marginLeft: -15 }} color="inherit" aria-label="Menu" onClick={this.toggleDrawerSearch}>
                                    <img src={back} alt="back"/>
                                </IconButton>
                            }
                            {
                                (window.location.pathname === '/home/notes') &&
                                <IconButton style={{ marginLeft: -15 }} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                                    <img src={menu} alt="menu" />
                                </IconButton>
                            }
                            {   
                                (window.location.pathname === '/home/trash' ||
                                window.location.pathname === '/home/archive' ||
                                window.location.pathname === '/home/reminder') &&
                                <IconButton style={{ marginLeft: -15 }} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                                    <img src={newmenu} alt="newmenu" />
                                </IconButton>
                            }
                            {
                                (window.location.pathname === '/home/search' ||
                                    window.location.pathname === '/home/trash' ||
                                    window.location.pathname === '/home/archive' ||
                                    window.location.pathname === '/home/reminder') &&
                                <Typography style={{color:'white', width: 155, marginLeft: 10, fontWeight: 'normal', fontSize: 23 }} variant="title" color="primary" >
                                    {this.state.title}
                                </Typography>
                            }
                            {
                                (window.location.pathname === '/home/notes') &&
                             <Typography style={{color:'black', width: 155, marginLeft: 10, fontWeight: 'normal', fontSize: 23 }} variant="title" color="primary" >
                                 {this.state.title}
                             </Typography>
                            }
                            <SearchBar style={{ height: 48, width: 720, marginLeft: 30 }}
                                onClick={() => this.goToSearch()}
                                onChange={() => console.log('onChange')}
                                onRequestSearch={() => console.log('onRequestSearch')} />

                            <IconButton style={{ marginLeft: 50 }} color="inherit" aria-label="Menu" onClick={this.refreshPage}>
                                <img src={refresh} alt="refresh" id="topicons"/>
                            </IconButton>

                             <ToggleDisplay show={this.state.viewbtn}>
                                <IconButton style={{ marginLeft: 3 }} color="inherit" aria-label="Menu" 
                                onClick={() => {this.handleViewClick();noteCtrl.notesInListView()}}>
                                    <img src={listview} alt="listview" id="topicons" />
                                </IconButton>
                            </ToggleDisplay>
                            
                            <ToggleDisplay show={!this.state.viewbtn}>
                                <IconButton style={{ marginLeft: 3 }} color="inherit" aria-label="Menu"
                                 onClick={() => {this.handleViewClick();noteCtrl.notesInGridView()}}>
                                    <img src={gridview} alt="gridview" id="topicons"  style={{height:24,width:24}} />
                                </IconButton>
                            </ToggleDisplay>
                            
                            <IconButton style={{ marginLeft: 30 }} color="inherit" aria-label="Menu">
                                <img src={googleapp} alt="googleapp" id="topicons" />
                            </IconButton>

                            <IconButton style={{ marginLeft: 3 }} color="inherit" aria-label="Menu">
                                <img src={notification} alt="notification" id="topicons" />
                            </IconButton>

                            {/* <Tooltip title={this.state.user}> */}
                            <IconButton style={{ marginLeft: 3 }} color="inherit" aria-label="Menu" onClick={this.handleClick}>
                                <span className="signoutbutton">{this.state.firstletter}</span>
                            </IconButton>
                            {/* </Tooltip> */}
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>

                {/* ----------------------- Drawer Implementation -------------------- */}
                <MuiThemeProvider>
                    <div>
                        <Drawer containerStyle={{ top: 64, background: '#e8e8e8' }} open={this.state.open}>
                            <Button style={{ marginTop: 10 }} id="drawerbuttons" color="inherit" href="/home/notes">
                                <img src={notes} alt="notes" id="imagenotes" />Notes
                            </Button>
                            <Button id="drawerbuttons" color="inherit" href='/home/reminder'>
                                <img src={reminder} alt="reminder" id="imagereminder" />Reminders
                            </Button>
                            <Divider style={{ marginTop: 10, marginBottom: 20 }} />

                            <span style={{ marginLeft: 15, fontSize: 14 }}>Labels</span>
                            <Button id="editbutton" onClick={this.handleClickOpen}>Edit</Button>

                            <DisplayLabels />
                            <Button id="drawerbuttons" color="inherit" onClick={this.handleClickOpen} >
                                <img src={createnewlabel} alt="createnewlabel" id="imagecreatelabel" />Create New Label
                            </Button>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />

                            <Button id="drawerbuttons" color="inherit" href="/home/archive">
                                <img src={archive} alt="archive" id="imagearchive" />Archive
                            </Button>
                            <Button id="drawerbuttons" color="inherit" href="/home/trash">
                                <img src={trash} alt="trash" id="imagetrash" />Trash
                            </Button>
                            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                        </Drawer>
                    </div>
                </MuiThemeProvider>

                {window.location.pathname === '/home/notes' && <Note />}
                {window.location.pathname === '/home/archive' && 
                    <ArchiveNotes />
                }

                {window.location.pathname === '/home/trash' && 
                    <TrashNotes />
                }

                {window.location.pathname === '/home/reminder' && <ReminderNotes />}
                
                {/* ----------------- Signout Card ----------------- */}
                <div className="appsignout">
                    <ToggleDisplay show={this.state.show}>
                        <Card className="signoutcard">
                            <div className="profilediv">
                                <table >
                                    <tr>
                                        <th>
                                            <div style={{ margin: 7, width: 100, height: 120 }}>
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ margin: 7, marginLeft: 0, width: 165, height: 120 }}>
                                                <Typography id="usernamelog">{this.state.user}</Typography><br></br>
                                                <Typography id="useremaillog">{this.state.username}</Typography>
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                            </div>
                            <Divider />
                            <div className="signoutdiv">
                                <Button variant="outlined" id="addaccount" href="/login">
                                    Add account
                                </Button>
                                <Button variant="outlined" id="signout" onClick={this.logout}>
                                    Sign out
                                </Button>
                            </div>
                        </Card>
                    </ToggleDisplay>
                </div>

                {/* -----------------Create Label Card ----------------- */}

                <div>
                    <Dialog PaperProps={
                        {
                            style: {
                                width: '300px'
                            }
                        }
                    }
                        open={this.state.labelopen}
                        onClose={this.handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Typography id="editlabel" variant="title">
                                Edit Labels
                            </Typography>
                        </DialogTitle>
                        <DialogContent style={{ marginTop: -20 }}>
                            <IconButton color="primary" id="cancellabelbutton" onClick={this.handleClickClose}>
                                <img src={cancel} alt="cancel" id="noteicons" />
                            </IconButton>
                            <Input
                                style={{ width: 180, height: 43, marginLeft: 10 }}
                                id="editlabeltitle"
                                type="text"
                                placeholder="Create new label"
                                onChange={e => this.setState({ newlabel: e.target.value })}
                            />
                            <IconButton color="primary" id="createlabelbutton" onClick={() => {this.createLabel();this.handleClickClose()}}>
                                <img src={createlabeldone} alt="createlabeldone" id="noteicons" />
                            </IconButton>
                            
                            <DisplayLabelsOnDialog />

                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button id="closebutton" onClick={() => {this.createLabel();this.handleClickClose()}}>Done</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default HomePage;