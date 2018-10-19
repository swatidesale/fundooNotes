import axios from 'axios';

//Class for label services
class LabelServices {
    /**
     * function to delete label from database
     * 
     * @param key
    */
    deleteLabel(key) {
        axios.delete('/api/labels/labels/'+key, { })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });    
    }

    /**
     * function to edit a label
     * 
     * @param label
     * @param key
    */
    onUpdateLabel(label,key) {
        const newlabel  = label;
        axios.put('/api/labels/labels/'+key, { newlabel })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });        
    }

}

export default LabelServices;