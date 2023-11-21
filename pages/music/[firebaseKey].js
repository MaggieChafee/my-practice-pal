/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { viewMusicDetails } from '../../api/mergedData';
import NoteCard from '../../components/cards/noteCard';

function ViewMusicDetails() {
  const [musicDetails, setMusicDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getMusicDeats = () => {
    viewMusicDetails(firebaseKey).then(setMusicDetails);
  };
  useEffect(() => {
    getMusicDeats();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="music-details-header">
        <h1>
          {musicDetails?.name} {musicDetails?.musicCompleted ? 'STAR' : ''}
        </h1>
        <h4>
          Written by {musicDetails?.composer}
        </h4>
        <h5>
          Category: {musicDetails?.category}
        </h5>
        <h5>
          Start Date: {musicDetails?.startDate}
        </h5>
        <Button href={musicDetails.recording}>Reference Recording</Button>
      </div>
      <div className="music-details-notecards">
        {musicDetails.notes?.map((notepad) => (
          <NoteCard key={notepad.firebaseKey} noteObj={notepad} onUpdate={getMusicDeats} />
        ))}
      </div>
    </div>
  );
}

export default ViewMusicDetails;
