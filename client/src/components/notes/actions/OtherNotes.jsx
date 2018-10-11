import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import AddPerson from '@material-ui/icons/PersonAdd';
import { Cancel, Check } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Button, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import pinnote from '../../../assets/icons/pinnote.svg';
import pickdate from '../../../assets/icons/peakdate.svg';
import pickplace from '../../../assets/icons/peakplace.svg';
import newnotewithimage from '../../../assets/icons/newnotewithimage.svg';
import collaborator from '../../../assets/icons/collaborator.svg';
import changecolor from '../../../assets/icons/changecolor.svg';
import archive from '../../../assets/icons/archive.svg';
import more from '../../../assets/icons/more.svg';
import undo from '../../../assets/icons/undo.svg';
import remindme from '../../../assets/icons/reminder.svg';
import redo from '../../../assets/icons/redo.svg';
import axios from 'axios';
import NoteController from '../../../controllers/NoteController.js';
import LabelController from '../../../controllers/LabelController';
import NoteServices from '../../../services/NoteServices';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();
const noteCtrl = new NoteController();
const labelCtrl = new LabelController();
const noteService = new NoteServices();

class OtherNote extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            anchorElRemind: null,
            anchorElAddLabel: null,
            anchorElColor: null,
            notes: [],
            open: false,
            notetitle: null,
            notedata: null,
            labels: [],
            images: [],
            archive: false,
            color: true,
            opencollaborator: false,
            file: null,
            imagePreviewUrl: null,
            sharewith: null,
            checksharewith: false,
            userfullname: null,
            useremail: null
        }

        this.handleClickLabel = this.handleClickLabel.bind(this);
        this.handleCloseLabel = this.handleCloseLabel.bind(this);
        this.triggerInputFile = this.triggerInputFile.bind(this);
        this.handleClickColor = this.handleClickColor.bind(this);
        this.handleCloseColor = this.handleCloseColor.bind(this);
        this.handleClickCheck = this.handleClickCheck.bind(this);
        this.handleClickCollaboratorClose = this.handleClickCollaboratorClose.bind(this);
        this.handleClickCollaboratorOpen = this.handleClickCollaboratorOpen.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/notes/notes')
          .then(res => {
            this.setState({ notes: res.data });
          })
        //   .catch((error) => {
        //     if(error.response.status === 401) {
        //       this.props.history.push("/login");
        //     }
        //   });

        axios.get('/api/labels/labels')
        .then(res => {
              this.setState({ labels: res.data });   
        })
        //   .catch((error) => {
        //     if(error.response.status === 401) {
        //       this.props.history.push("/login");
        //     }
        //   });
    }
    
    handleClickColor(event) {
        this.setState({ anchorElColor: event.currentTarget });
    }

    handleCloseColor = () => {
        this.setState({ anchorElColor: null });
    };

    handleClickLabel(event) {
        this.setState({
            anchorElAddLabel: event.currentTarget
        });
    }

    handleCloseLabel() {
        this.setState({ anchorElAddLabel: null });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickReminder = event => {
        this.setState({ anchorElRemind: event.currentTarget });
    };

    handleCloseReminder = () => {
        this.setState({ anchorElRemind: null });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClickClose = () => {
        this.setState({open: false });
    };

    handleClickCollaboratorOpen = () => {
        var email = localStorage.getItem('username');
        var fullname = localStorage.getItem('user');
        this.setState({ 
            opencollaborator: true,
            userfullname: fullname,
            useremail: email
        });
    }

    handleClickCollaboratorClose = () => {
        this.setState({ opencollaborator: false });
    }

    handleClickCheck() {
        this.setState({ checksharewith: true });
    }

    triggerInputFile() {
        this.fileInput.click();
    }
    
    handleImageChange = (event,key,note) => {
        this.uploadForm(event.target.files[0],key,note);
    }

    uploadForm(file,key,note){
        let form = new FormData(this.refs.myForm);
        form.append('newimage', file);

        fetch('/api/images/uploadimage/'+key, {
          method: 'POST',
          body: form,
        })
        .then(res => {
            axios.get('/api/images/uploadimage')
            .then(res => {
                this.setState({ images: res.data }); 
                this.state.images.forEach(function(image) {
                    if(key === image.noteId) {
                        note.image = 'http://localhost:8080/uploads/'+image.image;
                        noteService.onUpdateNote(key,note);
                    }
                })
            })
        });
    }

    firstLetter(sharenotewith,sharednoteby) {
       if(sharenotewith) {
        var res = sharenotewith.slice(0, 1);
        var userfirstletter = res.toLowerCase();
        return userfirstletter;
       }
       else if(sharednoteby) {
        var res1 = sharednoteby.slice(0, 1);
        var userfirstletter1 = res1.toLowerCase();
        return userfirstletter1;
       }
    }

    render() {
        const userId = localStorage.getItem('userKey');
        const { anchorEl } = this.state;
        const { anchorElRemind } = this.state;
        const { anchorElAddLabel } = this.state;
        const { anchorElColor } = this.state;
        return (
            this.state.notes.map((note) => {
                if(note.ispin === false && note.isarchive === false && note.istrash === false && userId === note.userId) {
                    return (
                        <form id="upload_form" ref="myForm"  encType="multipart/form-data">
                            <div id="submit" className="display-notes-div">
                                <div id="div_element" className="displaynotes column ">
                                    <Card style={{ width: '100%', backgroundColor:note.background, borderRadius:0 }} >
                                        <div style={{ width: '100%', fontWeight: 'bolder', position: 'relative' }}>
                                            {note.image ?
                                                <img src={note.image} alt="note" width='100%' style={{width: '100%'}}/>
                                                :
                                                null
                                            }
                                            <div style={{width:'90%', paddingBottom: 20, paddingTop: 10 }} onClick={this.handleClickOpen}>
                                                <div style={{marginTop: 10, marginLeft: 10}}>{note.notetitle}</div>
                                            </div>
                                            <div id="note-btns">
                                                <Tooltip title="Pin note">
                                                    <IconButton type="submit" style={{ height: 30, width: 30, position: 'absolute', display: 'inline-flex', top: 2, right: '1%' }}
                                                        color="primary"
                                                        onClick={() => noteCtrl.isPinNote(note._id, note)}
                                                    >
                                                        <img src={pinnote} alt="pinnote" id="noteicons" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        <div onClick={this.handleClickOpen} style={{ width: '100%', marginLeft: 10, marginBottom: 20,fontSize:20,opacity:0.7 }}>{note.notedata}</div>

                                        <div style={{display: 'flex'}}>
                                            {note.reminder ?
                                                <Chip
                                                    avatar={
                                                        <img src={pickdate} alt="pickdate" id="avtarremindermenuicons" />
                                                    }
                                                    label={note.reminder}
                                                    onDelete={() => noteCtrl.handleDeleteReminder(note._id, note)}
                                                    style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                                />
                                                :
                                                null
                                            }

                                            {note.label ?
                                                <Chip
                                                    label={note.label}
                                                    onDelete={() => labelCtrl.handleDeleteLabel(note._id, note)}
                                                    style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                                />
                                                :
                                                null
                                            }

                                            {note.sharenotewith || note.sharednoteby?
                                                <Avatar style={{margin:'0px 0px 0px 10px',width:23, height: 23, border:'2px solid white',backgroundColor:'rgb(96, 125, 139)'}}>
                                                    <span style={{marginTop:-3, fontSize: 14,fontWeight: 100}}>{this.firstLetter(note.sharenotewith,note.sharednoteby)}</span>
                                                </Avatar>
                                                :
                                                null
                                            }
                                        </div>

                                        <div id="note-btns" style={{ width: 240, height: 40 }}>
                                            <Tooltip title="Reminde me">
                                                <IconButton color="primary" id="notebuttons"
                                                    aria-owns={anchorElRemind ? 'simple-menu' : null}
                                                    aria-haspopup="true"
                                                    onClick={this.handleClickReminder}
                                                >
                                                    <img src={remindme} alt="remindme" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>

                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorElRemind}
                                                open={Boolean(anchorElRemind)}
                                                onClose={this.handleCloseReminder}
                                            >
                                                <div id="reminderdiv" >Reminder : </div>
                                                <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder(); noteCtrl.getToday(note._id, note) }}>Later Today<div id="remindermenu">8:00 PM</div></MenuItem>
                                                <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder(); noteCtrl.getTomorrow(note._id, note) }}>Tomorrow<div id="remindermenu">8:00 AM</div></MenuItem>
                                                <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder(); noteCtrl.getNextWeek(note._id, note) }}>Next Week<div id="remindermenu">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Mon, 8:00 AM</div></MenuItem>
                                                <MenuItem id="menuitems" onClick={this.handleCloseReminder}>
                                                    <img src={pickdate} alt="pickdate" id="remindermenuicons" />
                                                    Pick date & time
                                                </MenuItem>
                                                <MenuItem id="menuitems" onClick={this.handleCloseReminder}>
                                                    <img src={pickplace} alt="pickplace" id="remindermenuicons" />
                                                    Pick place
                                                </MenuItem>
                                            </Menu>


                                            <Tooltip title="Collaborator">
                                                <IconButton color="primary" id="notebuttons" onClick={this.handleClickCollaboratorOpen}>
                                                    <img src={collaborator} alt="collaborator" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Change color">
                                                <IconButton color="primary" id="notebuttons" className="change-color-btn"
                                                    aria-owns={anchorElColor ? 'color-menu' : null}
                                                    aria-haspopup="true"
                                                    onClick={this.handleClickColor}
                                                >
                                                    <img src={changecolor} alt="changecolor" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>

                                            <Menu
                                                id="color-menu"
                                                position="right top"
                                                anchorEl={anchorElColor}
                                                open={Boolean(anchorElColor)}
                                                onClose={this.handleCloseColor}
                                            >
                                                {/* <Tooltip title="White"> */}
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "white" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,1)}} />
                                                {/* </Tooltip> */}
                                                <Tooltip title="Red">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(255, 138, 128)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,2)}} />
                                                </Tooltip>
                                                <Tooltip title="Orange">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(255, 209, 128)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,3)}} />
                                                </Tooltip>
                                                <Tooltip title="Yellow">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(255, 255, 141)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,4)}} />
                                                </Tooltip>
                                                <br></br>
                                                <Tooltip title="Green">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(204, 255, 144)" }}
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,5)}}  />
                                                </Tooltip>
                                                <Tooltip title="Teal">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(167, 255, 235)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,6)}} />       
                                                </Tooltip>
                                                <Tooltip title="Blue">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(128, 216, 255)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,7)}} />   
                                                </Tooltip>
                                                <Tooltip title="Dark blue">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(130, 177, 255)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,8)}} />
                                                </Tooltip>
                                                <br></br>
                                                <Tooltip title="Purple">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(179, 136, 255)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,9)}} /> 
                                                </Tooltip>
                                                <Tooltip title="Pink">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(248, 187, 208)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,10)}} />
                                                </Tooltip>
                                                <Tooltip title="Brown">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(215, 204, 200)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,11)}} />
                                                </Tooltip>
                                                <Tooltip title="Gray">
                                                    <IconButton id="color-btn" 
                                                        style={{ backgroundColor: "rgb(207, 216, 220)" }} 
                                                        onClick={() => {this.handleCloseColor();noteCtrl.changeColor(note._id,note,12)}} />
                                                </Tooltip>
                                            </Menu>

                                            <input style={{ display: 'none' }}
                                                type="file"
                                                ref={fileInput => this.fileInput = fileInput}
                                                onChange={(e) => this.handleImageChange(e,note._id,note)} 
                                                value={this.state.image}
                                            >
                                            </input>
                                            <Tooltip title="Add image">
                                                <IconButton color="primary" id="notebuttons" onClick={(e) => {this.triggerInputFile()}}>
                                                    <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Archive">
                                                <IconButton type="submit" color="primary" id="notebuttons" 
                                                    onClick={() => {noteCtrl.isArchiveNote(note._id,note);}}
                                                >
                                                    <img src={archive} alt="archive" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="More">
                                                <IconButton color="primary" id="notebuttons"
                                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                                    aria-haspopup="true"
                                                    onClick={this.handleClick}
                                                >
                                                    <img src={more} alt="more" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>

                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={this.handleClose}
                                            >
                                                <Button id="note-menu-btn" 
                                                    onClick={() => { this.handleClose(); noteCtrl.isTrashNote(note._id, note) }}
                                                    >Delete note</Button>
                                                <br></br>
                                                <Button style={{ paddingLeft: 2 }}
                                                    id="note-menu-btn"
                                                    aria-owns={anchorElAddLabel ? 'simple-menu-add-label' : null}
                                                    aria-haspopup="true"
                                                    onClick={this.handleClickLabel}>
                                                    Add label
                                                </Button>
                                            </Menu>
                                        </div>
                                    </Card>
                                </div>

                                {/* ----------------------- Edit Note Implementation -------------------- */}
                                <div>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClickClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            <Input style={{ width: 500, height: 43 }}
                                                id="edittitle"
                                                className="addnotetitleinput"
                                                disableUnderline={true}
                                                type="text"
                                                defaultValue={note.notetitle}
                                                onInput={e => this.setState({ notetitle: e.target.value })}
                                            />
                                        </DialogTitle>
                                        <DialogContent>
                                            <Input
                                                id="editnotedata"
                                                className="addnotetitleinput"
                                                disableUnderline={true}
                                                type="text"
                                                defaultValue={note.notedata}
                                                onInput={e => this.setState({ notedata: e.target.value })}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <div style={{ width: 600, height: 40, marginTop: -12 }}>
                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={remindme} alt="remindme" id="noteicons" />
                                                </IconButton>
                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={collaborator} alt="collaborator" id="noteicons" />
                                                </IconButton>

                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={changecolor} alt="changecolor" id="noteicons" />
                                                </IconButton>

                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                                </IconButton>

                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={archive} alt="archive" id="noteicons" />
                                                </IconButton>

                                                <IconButton color="primary" id="notebuttons"
                                                    aria-owns={anchorEl ? 'simple-menu-items' : null}
                                                    aria-haspopup="true"
                                                    onClick={this.handleClick}
                                                >
                                                    <img src={more} alt="more" id="noteicons" />
                                                </IconButton>

                                                <Menu
                                                    id="simple-menu-items"
                                                >
                                                    <MenuItem>Delete note</MenuItem>
                                                    <MenuItem>Add label</MenuItem>
                                                </Menu>

                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={undo} alt="undo" id="noteicons" />
                                                </IconButton>
                                                <IconButton color="primary" id="notebuttons">
                                                    <img src={redo} alt="redo" id="noteicons" />
                                                </IconButton>

                                                <Button id="closebutton" onClick={() => {noteCtrl.onNoteEdit(this.state.notetitle, this.state.notedata, note._id, note);this.handleClickClose()}}>Close</Button>
                                            </div>
                                        </DialogActions>
                                    </Dialog>
                                </div>

                                {/* ----------------------- Add Label On Note -------------------- */}
                                <Menu
                                    id="simple-menu-add-label"
                                    anchorEl={anchorElAddLabel}
                                    open={Boolean(anchorElAddLabel)}
                                    onClose={this.handleCloseLabel}
                                >
                                    <div id="label-note">Label note</div>
                                    <Input
                                        id="label-search"
                                        disableUnderline={true}
                                        type="text"
                                        placeholder="Enter label name"
                                    />
                                    {this.state.labels.map((label) => {
                                        if(userId === label.userId) {
                                            return (
                                                <div>
                                                    <FormControlLabel
                                                        id="add-label-note"
                                                        control={
                                                            <Checkbox
                                                                style={{ width: 36, height: 36, padding: 5 }}
                                                                icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                                                checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                                                                color="default"
                                                                onClick={() => {labelCtrl.getLabel(note._id, note, label);this.handleCloseLabel();this.handleClose()}}
                                                            />
                                                        }
                                                        label={label.newlabel}
                                                    />
                                                </div>
                                            );
                                        }
                                        else {
                                            return(
                                                <div>
                                                </div>
                                            )
                                        }
                                    })
                                    }
                                </Menu>

                                {/* ----------------------- Collaborator -------------------- */}
                                <div>
                                <Dialog
                                    open={this.state.opencollaborator}
                                    onClose={this.handleClickCollaboratorClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Collaborators
                                    </DialogTitle>
                                    <Divider id="collaborator-title-divider"></Divider>
                                    <DialogContent>
                                        <div>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                            {note.sharednoteby ?
                                                <div id="collaborator-data-div">
                                                    <span style={{fontWeight: 700}}>{note.sharedperson}</span><span id="owner-span">(Owner)</span><br></br>
                                                    <span style={{opacity: 0.7}}>{note.sharednoteby}</span>
                                                </div>
                                                :

                                                <div id="collaborator-data-div">
                                                    <span style={{fontWeight: 700}}>{this.state.userfullname}</span><span id="owner-span">(Owner)</span><br></br>
                                                    <span style={{opacity: 0.7}}>{this.state.useremail}</span>
                                                </div>

                                            }
                                        </div>

                                        {note.sharenotewith ?
                                            <div style={{marginTop:15,height:35}}>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                                <div id="collaborator-sharewith-div">
                                                    <div >
                                                        {/* <span style={{fontWeight: 700}}>Swati Desale</span><span id="owner-span">(Owner)</span><br></br> */}
                                                        <span style={{fontWeight: 700}}>{note.sharenotewith}</span>
                                                    </div>
                                                    <IconButton id="sharewith-cancel-btn" type="submit">
                                                        <Cancel style={{marginTop: -12}} onClick={() => {noteCtrl.onDeleteShareWith(note._id,note);this.handleClickCollaboratorClose()}}/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }

                                        <div style={{marginTop:15,height:35}}>
                                            <Avatar>
                                                <AddPerson />
                                            </Avatar>
                                            <div id="collaborator-sharewith-div">
                                                <Input
                                                    id="sharewith-input"
                                                    disableUnderline={true}  
                                                    type="text" 
                                                    placeholder="Person or email to share with" 
                                                    onInput={e => this.setState({ sharewith: e.target.value })}
                                                    onChange={this.handleClickCheck}
                                                />
                                                {this.state.checksharewith ? 
                                                    <IconButton id="sharewith-check-btn">
                                                        <Check type="submit" style={{marginTop: -8,height:17,width:17}} 
                                                            onClick={() => {noteCtrl.shareNoteWith(this.state.sharewith,note._id,note)}}
                                                        />
                                                    </IconButton>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>

                                    </DialogContent>
                                    <div id="collaborator-actions">
                                        <Button id="collaborator-cancel-btn" onClick={() => {this.handleClickCollaboratorClose()}}>cancel</Button>
                                        <Button id="collaborator-save-btn" onClick={() => {this.handleClickCollaboratorClose();noteCtrl.shareNoteWith(this.state.sharewith,note._id,note)}}>save</Button>
                                    </div>
                                </Dialog>
                            </div>
                            </div>  
                        </form>
                    );
                }
                else {
                    return (
                        <div>
                        </div>
                    );
                }
            })
        );
    }
}

export default OtherNote;