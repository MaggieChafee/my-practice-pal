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

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>{musicObj.musicCompleted && <span>STAR<br /></span>}</Card.Text>
        <Card.Title>{musicObj.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">By {musicObj.composer}</Card.Subtitle>
        <Card.Text>{musicObj.category}</Card.Text>
        <Card.Text>{musicObj.startDate}</Card.Text>
        <Button href={musicObj.recording}>Reference Recording</Button>
        <div>
          <Link href={`/music/${musicObj.firebaseKey}`} passHref>
            <Button variant="primary">Details</Button>
          </Link>
          <Link href={`/music/edit/${musicObj.firebaseKey}`} passHref>
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="primary" onClick={deleteThisMusic}>Delete</Button>
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
