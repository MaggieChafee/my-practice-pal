/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { deleteMusicAndNotes } from '../../api/mergedData';

function MusicCard({ musicObj, onUpdate }) {
  const deleteThisMusic = () => {
    if (window.confirm(`Do you want to delete ${musicObj.name}?`)) {
      deleteMusicAndNotes(musicObj.firebaseKey).then(() => onUpdate());
    }
  };

  const star = <FontAwesomeIcon icon={faStar} size="2xl" style={{ color: '#f9dd76' }} />;
  const condition = musicObj.musicCompleted;
  const result = condition ? 'completed' : 'not-completed';
  const headResult = condition ? 'card-head-closed' : 'card-head-open';

  return (
    <Card className={result} style={{ width: '20rem' }}>
      <Card.Body>
        <div className={headResult}>
          <div>
            <Card.Text>{musicObj.musicCompleted ? star : '' }</Card.Text>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>{musicObj.name}</h4>
            <h6 style={{ fontWeight: 'bolder', fontStyle: 'italic' }}>By {musicObj.composer}</h6>
          </div>
        </div>
        <hr />
        <Card.Text>{musicObj.category}</Card.Text>
        <Card.Text>{musicObj.startDate}</Card.Text>
        <Card.Link href={musicObj.recording}>Reference Recording</Card.Link>
        <div style={{ height: '25px' }} />
        <div className="button-container">
          <Link href={`/music/${musicObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">View</Button>
          </Link>
          <Link href={`/music/edit/${musicObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">Edit</Button>
          </Link>
          <Button className="btn-orange" variant="dark" onClick={deleteThisMusic}>Delete</Button>
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
