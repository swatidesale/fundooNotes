import React, { Component } from 'react';
import PinNotes from './actions/PinedNotes';
import OtherNotes from './actions/OtherNotes';
 
class DisplayNotes extends Component {
    render() {
        return(
            <div>
                <div>
                    <div style={{width:240,marginLeft: 400,marginTop: 35,opacity:0.5,fontWeight:'bold',fontSize:15}}>
                        Pinned 
                    </div>
                    <PinNotes />
                </div>

                <div>
                    <div style={{width:240,marginLeft: 400,marginTop:160,opacity:0.5,fontWeight:'bold',fontSize:15}}>
                        Others 
                    </div>
                    <OtherNotes />
                </div>
            </div>
        );
    }
}

export default DisplayNotes;