/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import JournalEntryCard from '../../../components/cards/journalEntryCard';
import { getEntriesByJournalId } from '../../../api/journalEntryData';
import { getGoalsByJournalId } from '../../../api/goalData';
import GoalCard from '../../../components/cards/goalCard';
import { getSingleNote } from '../../../api/notepadData';

function ViewNotePadDetails() {
  const [noteDetails, setNoteDetails] = useState({});
  const [journalEntries, setJournalEntries] = useState([]);
  const [goal, setGoal] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getNoteDeats = () => {
    getSingleNote(firebaseKey).then(setNoteDetails);
  };

  const getJournalEntries = () => {
    getEntriesByJournalId(firebaseKey).then(setJournalEntries);
  };

  const getJournalGoals = () => {
    getGoalsByJournalId(firebaseKey).then(setGoal);
  };

  const checkmark = <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#ed6335' }} />;

  useEffect(() => {
    getNoteDeats();
    getJournalEntries();
    getJournalGoals();
  }, [firebaseKey]);

  return (
    <div className="page-container">
      <div>
        <div className="details-head">
          <h1>
            {noteDetails?.noteClosed ? checkmark : ''} {noteDetails.piece}
          </h1>
          <h3>
            {noteDetails?.startDate} to {noteDetails.endDate}
          </h3>
          <Link href={`/journal/edit/${noteDetails.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
        </div>
        <hr />
        <div>
          <Link href={`/journalEntry/new/${noteDetails.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Add a Note</Button>
          </Link>
          <Link passHref href={`/goal/new/${noteDetails.firebaseKey}`}>
            <Button className="btn-orange" variant="dark">Add a Goal</Button>
          </Link>
        </div>
        <div className="cards-container">
          {goal.map((allGoals) => (
            <GoalCard key={allGoals.firebaseKey} goalObj={allGoals} onUpdate={getJournalGoals} />
          ))}
        </div>
        <div className="cards-container-journalentry">
          {journalEntries.map((allEntries) => (
            <JournalEntryCard key={allEntries.firebaseKey} entryObj={allEntries} onUpdate={getJournalEntries} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewNotePadDetails;
