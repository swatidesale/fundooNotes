import React, { Component } from 'react';
import labelicon from '../../../assets/icons/labelicon.svg';
import editlabel from '../../../assets/icons/editlabel.svg';
import deleteimg from '../../../assets/icons/trash.svg';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import LabelController from '../../../controllers/LabelController';

const labelCtrl = new LabelController();

class DisplayLabelsOnDialog extends Component {
    constructor() {
        super();

        this.state = {
            labels: [],
            label: null,
            img: labelicon,
            opacity: 0.5,
            opacity1: 0.5,
            open: true
        }

        this.handleClickEditLabel = this.handleClickEditLabel.bind(this);
        this.handleCloseEditLabel = this.handleCloseEditLabel.bind(this);
    }

    componentDidMount() {
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

    handleClickEditLabel() {
        this.setState({ open: false });
    }
    
    handleCloseEditLabel() {
        this.setState({ open: true });
    }

    render() {
        const userId = localStorage.getItem('userKey');
        return (
            this.state.labels.map((label) => {
                if (label !== null && userId === label.userId) {
                    return ( 
                        <div className="labelondialog" >
                            <IconButton color="inherit" aria-label="labels"  id="deletelabelbtn" onClick={() => labelCtrl.deleteLabel(label._id)}>
                                <img id="deletelabelimg" alt="labelicon"  style={{opacity: this.state.opacity}}
                                src={this.state.img}
                                onMouseEnter={() => {
                                  this.setState({
                                    img: deleteimg,
                                    opacity: 1
                                  })
                                }}
                      
                                onMouseOut={() => {
                                  this.setState({
                                    img: labelicon,
                                    opacity: 0.5
                                  })
                                }}
                                />
                            </IconButton>
                            <Input 
                                id="editlabeldata"
                                disableUnderline={true} 
                                type="text" 
                                defaultValue={label.newlabel} 
                                onInput={e => this.setState({ label: e.target.value })}
                            />
 
                            <IconButton color="inherit" aria-label="labels" id="editlabelbtn" onClick={() => labelCtrl.editLabel(this.state.label,label._id)}>
                                <img src={editlabel} alt="editlabel" style={{opacity: this.state.opacity1,marginTop: -7, width: 20}}
                                     onMouseEnter={() => {
                                        this.setState({
                                            opacity1: 1
                                        })
                                    }}
                            
                                    onMouseOut={() => {
                                        this.setState({
                                            opacity1: 0.5
                                        })
                                    }}
                                />
                            </IconButton>

                            {/* {this.state.open ?
                                <div>
                                    <Input 
                                        id="editlabeldata"
                                        disableUnderline={true} 
                                        type="text" 
                                        defaultValue={label.newlabel} 
                                        onInput={e => this.setState({ label: e.target.value })}
                                    />
        
                                    <IconButton color="inherit" aria-label="labels" id="editlabelbtn" onClick={this.handleClickEditLabel}>
                                        <img src={editlabel} alt="editlabel" style={{opacity: this.state.opacity1,marginTop: -7, width: 20}}
                                            onMouseEnter={() => {
                                                this.setState({
                                                    opacity1: 1
                                                })
                                            }}
                                    
                                            onMouseOut={() => {
                                                this.setState({
                                                    opacity1: 0.5
                                                })
                                            }}
                                        />
                                    </IconButton> 
                                </div>

                                :

                                <div>
                                    <Input 
                                        id="editlabeldata"
                                        disableUnderline={true} 
                                        type="text" 
                                        onInput={e => this.setState({ label: e.target.value })}
                                    />
        
                                    <IconButton color="inherit" aria-label="labels" id="editlabelbtn" onClick={() => labelCtrl.editLabel(this.state.label,label._id)}>
                                        <img src={editlabel} alt="editlabel" style={{opacity: this.state.opacity1,marginTop: -7, width: 20}}
                                            onMouseEnter={() => {
                                                this.setState({
                                                    opacity1: 1
                                                })
                                            }}
                                    
                                            onMouseOut={() => {
                                                this.setState({
                                                    opacity1: 0.5
                                                })
                                            }}
                                        />
                                    </IconButton> 
                                </div>
                            } */}
                        </div>
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

export default DisplayLabelsOnDialog;