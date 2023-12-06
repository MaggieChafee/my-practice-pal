/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { viewMusicDetails } from '../../api/mergedData';
import NoteCard from '../../components/cards/noteCard';
import { getNotesByMusicId } from '../../api/notepadData';

function ViewMusicDetails() {
  const [musicDetails, setMusicDetails] = useState({});
  const [note, setNotes] = useState([]);
  const [cNote, setCNotes] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getMusicDeats = () => {
    viewMusicDetails(firebaseKey).then(setMusicDetails);
  };

  const getFilteredNotes = () => {
    getNotesByMusicId(firebaseKey).then((openNotes) => {
      const openNotepads = openNotes.filter((openNote) => openNote.noteClosed === false);
      setNotes(openNotepads);
    });
  };

  const getFilteredNotesOpen = () => {
    getNotesByMusicId(firebaseKey).then((closedNotes) => {
      const closedNotepads = closedNotes.filter((closedNote) => closedNote.noteClosed === true);
      setCNotes(closedNotepads);
    });
  };

  const star = <FontAwesomeIcon icon={faStar} size="lg" style={{ color: '#f9dd76' }} />;

  useEffect(() => {
    getFilteredNotesOpen();
    getFilteredNotes();
    getMusicDeats();
  }, []);

  return (
    <div className="page-container">
      <div>
        <div className="details-head">
          <h1>
            {musicDetails?.name} {musicDetails?.musicCompleted ? star : '' }
          </h1>
          <Link href={`/music/edit/${musicDetails.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
        </div>
        <hr />
        <div>
          <h4>
            Written by {musicDetails?.composer}
          </h4>
          <h5>
            Category: {musicDetails?.category}
          </h5>
          <h5>
            Start Date: {musicDetails?.startDate}
          </h5>
          <Button className="btn-green" variant="dark" href={musicDetails.recording}>Reference Recording</Button>
        </div>
      </div>
      <div style={{ height: '30px' }} />
      <div>
        <Link href={`../notepad/new/${musicDetails.firebaseKey}`} passHref>
          <Button className="btn-orange" variant="dark">Add a Notepad</Button>
        </Link>
      </div>
      <div style={{ height: '50px' }} />
      <h4>Current Notepad</h4>
      <div className="cards-container-details">
        {note?.map((filteredNotepad) => (
          <NoteCard key={filteredNotepad.firebaseKey} noteObj={filteredNotepad} onUpdate={getFilteredNotes} />
        ))}
      </div>
      <div style={{ height: '50px' }} />
      <h4>Past Notepads</h4>
      <div className="cards-container-details">
        {cNote?.map((filteredNotepad) => (
          <NoteCard key={filteredNotepad.firebaseKey} noteObj={filteredNotepad} onUpdate={getFilteredNotesOpen} />
        ))}
      </div>
    </div>
  );
}

export default ViewMusicDetails;
