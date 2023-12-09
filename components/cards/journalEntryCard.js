import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function JournalEntryCard({ entryObj }) {
  return (
    <Card className="not-completed">
      <Card.Header as="h5">  Date: {entryObj.date}</Card.Header>
      <Card.Body>
        <Card.Title>{entryObj.category}</Card.Title>
        <Card.Text>
          {entryObj.jotSheet}
        </Card.Text>
        <Button className="btn-orange" variant="dark">Edit</Button>
      </Card.Body>
    </Card>
  );
}

JournalEntryCard.propTypes = {
  entryObj: PropTypes.shape({
    date: PropTypes.string,
    jotSheet: PropTypes.string,
    firebaseKey: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};
