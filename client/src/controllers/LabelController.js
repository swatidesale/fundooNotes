import NoteServices from '../services/NoteServices';
import LabelServices from '../services/LabelServices';

const noteService = new NoteServices();
const labelService = new LabelServices();

//Class for label controller operations
class LabelController {
    /**
     * function to delete label from database
     * 
     * @param key
    */
    deleteLabel(key) {   
        labelService.deleteLabel(key);
    }

    /**
     * function to edit label
     * 
     * @param label
     * @param key
    */
    editLabel(label,key) {
        if(label !== null)
        labelService.onUpdateLabel(label,key);
    }

    /**
     * function to get a label and display on note
     * 
     * @param key
     * @param note
     * @param label
    */
    getLabel(key, note, label) {
        note.label = label.newlabel;
        noteService.onUpdateNote(key,note);
    }

    /**
     * funtion to delete label from note data
     * 
     * @param key
     * @param note
    */
    handleDeleteLabel(key, note) {
        note.label = null;
        noteService.onUpdateNote(key,note);
    }
}

export default LabelController;