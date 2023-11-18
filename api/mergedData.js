import { deleteSingleMusic, getSingleMusic } from './musicData';
import { deleteSingleNote, getNotesByMusicId, getSingleNote } from './notepadData';

const viewNoteDetails = (noteFirebaseKey) => new Promise((resolve, reject) => {
  getSingleNote(noteFirebaseKey)
    .then((noteObject) => {
      getSingleMusic(noteObject.musicId)
        .then((musicObject) => {
          resolve({ musicObject, ...noteObject });
        });
    }).catch((error) => reject(error));
});

const viewMusicDetails = (musicFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMusic(musicFirebaseKey), getNotesByMusicId(musicFirebaseKey)])
    .then(([musicObject, musicNotesArray]) => {
      resolve({ ...musicObject, notes: musicNotesArray });
    }).catch((error) => reject(error));
});

const deleteMusicAndNotes = (firebaseKey) => new Promise((resolve, reject) => {
  getNotesByMusicId(firebaseKey).then((notesArray) => {
    const deleteNotePromises = notesArray.map((note) => deleteSingleNote(note.firebaseKey));

    Promise.all(deleteNotePromises).then(() => {
      deleteSingleMusic(firebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewNoteDetails, viewMusicDetails, deleteMusicAndNotes };
