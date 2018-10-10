import axios from 'axios';

class NoteServices {
    onUpdateNote(key,note) {
        const ispin  = note.ispin;
        const isarchive = note.isarchive;
        const istrash = note.istrash;
        const background = note.background;
        const reminder = note.reminder;
        const notetitle = note.notetitle;
        const notedata = note.notedata;
        const label = note.label;
        const image = note.image;
        const sharenotewith = note.sharenotewith;
        axios.put('/api/notes/notes/'+key, { notetitle, notedata, ispin, isarchive, istrash, background, reminder, label, image, sharenotewith })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });        
    }

    deleteForever(key, data) {
        axios.delete('/api/notes/notes/'+key, { })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });    
    }
}

export default NoteServices;