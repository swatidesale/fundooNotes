import NoteServices from '../services/NoteServices';
import LabelServices from '../services/LabelServices';

const noteService = new NoteServices();
const labelService = new LabelServices();

class LabelController {
    deleteLabel(key) {   
        labelService.deleteLabel(key);
    }

    editLabel(label,key) {
        if(label !== null)
        labelService.onUpdateLabel(label,key);
    }

    getLabel(key, note, label) {
        note.label = label.newlabel;
        noteService.onUpdateNote(key,note);
    }

    handleDeleteLabel(key, note) {
        note.label = null;
        noteService.onUpdateNote(key,note);
    }
}

export default LabelController;