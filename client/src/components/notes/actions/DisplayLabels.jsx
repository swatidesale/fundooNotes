import React, { Component } from 'react';
import labelicon from '../../../assets/icons/labelicon.svg';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class DisplayLabels extends Component {
    constructor() {
        super();

        this.state = {
            labels: []
        }
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

    render() {
        const userId = localStorage.getItem('userKey');
        return (
            this.state.labels.map((label) => {               
                if (label !== null && userId === label.userId) {
                    return ( 
                        <div>
                            <Button id="drawerbuttons" color="inherit">
                                <img src={labelicon} alt="labelicon" id="imagecreatedlabel" />
                                <div style={{marginLeft: 40}}>{label.newlabel}</div>
                            </Button>
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

export default DisplayLabels;