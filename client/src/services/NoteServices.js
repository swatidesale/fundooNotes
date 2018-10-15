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

    shareNoteWith(shareWith,key,note) {
        const username = localStorage.getItem('username');
        const userfullname = localStorage.getItem('user');
        const sharenotewith = shareWith;
        var users = [];
        axios.get('/api/users/register')
          .then(res => {
            users = res.data;
            users.forEach(function(user) {
                var userId = user._id;
                var notetitle = note.notetitle;
                var notedata = note.notedata;
                var image = note.image;
                console.log("image....",image);
                var sharednoteby = username;
                var sharedperson = userfullname;
                if(user.username === sharenotewith) {
                    axios.post('/api/notes/sharenote', { key,username,sharenotewith,userfullname })
                    .then((result) => {
                        axios.post('/api/notes/notes',{userId, image, notetitle, notedata, sharednoteby,sharedperson})
                            .then((result) => {
                                    console.log("Result...",result);
                                    
                            })
                    })
                }
            });
        });
    }
}

export default NoteServices;