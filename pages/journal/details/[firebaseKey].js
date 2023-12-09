/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { viewNoteDetails } from '../../../api/mergedData';
import JournalEntryCard from '../../../components/cards/journalEntryCard';
import { getEntriesByJournalId } from '../../../api/journalEntryData';

function ViewNotePadDetails() {
  const [noteDetails, setNoteDetails] = useState({});
  const [journalEntries, setJournalEntries] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getNoteDeats = () => {
    viewNoteDetails(firebaseKey).then(setNoteDetails);
  };

  const getJournalEntries = () => {
    getEntriesByJournalId(firebaseKey).then(setJournalEntries);
  };

  const checkmark = <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#ed6335' }} />;

  useEffect(() => {
    getNoteDeats();
    getJournalEntries();
  }, []);

  return (
    <div className="page-container">
      <div>
        <div className="details-head">
          <h1>
            Journal for {noteDetails?.startDate} to {noteDetails.endDate} {noteDetails?.noteClosed ? checkmark : ''}
          </h1>
          <Link href={`/journal/edit/${noteDetails.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
        </div>
        <hr />
        <div className="cards-container-journalentry">
          {journalEntries.map((allEntries) => (
            <JournalEntryCard key={allEntries.firebaseKey} entryObj={allEntries} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewNotePadDetails;
