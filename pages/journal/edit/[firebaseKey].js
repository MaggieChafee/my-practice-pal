import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleNote } from '../../../api/notepadData';
import NotepadForm from '../../../components/forms/notepadForm';

function EditNotepad() {
  const [editNote, setEditNote] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleNote(firebaseKey).then(setEditNote);
  }, [firebaseKey]);

  return (
    <>
      <div className="page-container">
        <h1>Update Journal</h1>
        <NotepadForm noteObj={editNote} />
      </div>
    </>
  );
}

export default EditNotepad;
