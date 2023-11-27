import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleNote } from '../../../api/notepadData';
import NoteForm from '../../../components/forms/noteForm';

function EditNote() {
  const [editNote, setEditNote] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleNote(firebaseKey).then(setEditNote);
  }, [firebaseKey]);

  return (
    <NoteForm noteObj={editNote} />
  );
}

export default EditNote;
