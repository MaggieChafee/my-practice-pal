import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MusicCard({ musicObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{musicObj.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">By {musicObj.composer}</Card.Subtitle>
        <Card.Text>{musicObj.category}</Card.Text>
        <Card.Text>{musicObj.startDate}</Card.Text>
        <Card.Link href={musicObj.recording}>Reference Recording</Card.Link>
        <Button variant="primary">Details</Button>
        <Button variant="primary">Edit</Button>
        <Button variant="primary">Delete</Button>
      </Card.Body>
    </Card>
  );
}

MusicCard.propTypes = {
  musicObj: PropTypes.shape({
    name: PropTypes.string,
    composer: PropTypes.string,
    category: PropTypes.string,
    startDate: PropTypes.string,
    recording: PropTypes.string,
  }).isRequired,
};

export default MusicCard;