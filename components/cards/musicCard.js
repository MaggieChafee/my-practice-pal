/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteMusicAndNotes } from '../../api/mergedData';

function MusicCard({ musicObj, onUpdate }) {
  const deleteThisMusic = () => {
    if (window.confirm(`Do you want to delete ${musicObj.name}?`)) {
      deleteMusicAndNotes(musicObj.firebaseKey).then(() => onUpdate());
    }
  };

  const condition = musicObj.musicCompleted;
  const result = condition ? 'achieve' : 'dash';

  return (
    <Card className={result} style={{ width: '20rem' }}>
      <Card.Body>
        <div className="card-head">
          <div>
            <Card.Text>{musicObj.musicCompleted && <span>STAR<br /></span>}</Card.Text>
          </div>
          <div className="card-title">
            <Card.Title>{musicObj.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">By {musicObj.composer}</Card.Subtitle>
          </div>
        </div>
        <hr />
        <Card.Text>{musicObj.category}</Card.Text>
        <Card.Text>{musicObj.startDate}</Card.Text>
        <Button variant="outline" href={musicObj.recording}>Reference Recording</Button>
        <div>
          <Link href={`/music/${musicObj.firebaseKey}`} passHref>
            <Button variant="outline-dark">View</Button>
          </Link>
          <Link href={`/music/edit/${musicObj.firebaseKey}`} passHref>
            <Button variant="outline-dark">Edit</Button>
          </Link>
          <Button variant="outline-dark" onClick={deleteThisMusic}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MusicCard.propTypes = {
  musicObj: PropTypes.shape({
    name: PropTypes.string,
    composer: PropTypes.string,
    musicCompleted: PropTypes.bool,
    category: PropTypes.string,
    startDate: PropTypes.string,
    recording: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MusicCard;
