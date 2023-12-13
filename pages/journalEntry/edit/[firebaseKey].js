import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEntry } from '../../../api/journalEntryData';
import JournalEntryForm from '../../../components/forms/journalEntryForm';

function EditJournalEntry() {
  const [editEntry, setEditEntry] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEntry(firebaseKey).then(setEditEntry);
  }, [firebaseKey]);

  return (
    <>
      <div className="page-container">
        <h1>Update Note</h1>
        <JournalEntryForm entryObj={editEntry} />
      </div>
    </>
  );
}

export default EditJournalEntry;
