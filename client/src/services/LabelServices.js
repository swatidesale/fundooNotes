import axios from 'axios';

class LabelServices {
    deleteLabel(key) {
        axios.delete('/api/labels/labels/'+key, { })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });    
    }

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