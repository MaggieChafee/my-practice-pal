import { deleteGoal, getGoalsByJournalId } from './goalData';
import { deleteEntry, getEntriesByJournalId } from './journalEntryData';
import { deleteSingleMusic, getSingleMusic } from './musicData';
import { deleteSingleNote, getNotesByMusicId, getSingleNote } from './notepadData';

const viewMusicDetails = (musicFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMusic(musicFirebaseKey), getNotesByMusicId(musicFirebaseKey)])
    .then(([musicObject, musicNotesArray]) => {
      resolve({ ...musicObject, notes: musicNotesArray });
    }).catch((error) => reject(error));
});

const deleteEntireJournal = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleNote(firebaseKey).then(() => {
    const deleteAllEntries = getEntriesByJournalId(firebaseKey).then((entryArray) => entryArray.map((entry) => deleteEntry(entry.firebaseKey)));
    const deleteAllGoals = getGoalsByJournalId(firebaseKey).then((goalArray) => goalArray.map((goal) => deleteGoal(goal.firebaseKey)));
    Promise.all([deleteAllEntries, deleteAllGoals]).then(() => {
      deleteSingleNote(firebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteMusicAndNotes = (firebaseKey) => new Promise((resolve, reject) => {
  getNotesByMusicId(firebaseKey).then((notesArray) => {
    const deleteNotePromises = notesArray.map((note) => deleteEntireJournal(note.firebaseKey));

    Promise.all(deleteNotePromises).then(() => {
      deleteSingleMusic(firebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMusicDetails, deleteMusicAndNotes, deleteEntireJournal };
