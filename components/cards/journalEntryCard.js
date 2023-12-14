import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { deleteEntry } from '../../api/journalEntryData';

export default function JournalEntryCard({ entryObj, onUpdate }) {
  const deleteThisJournalEntry = () => {
    if (window.confirm(`Do you want to delete your note from ${entryObj.date}?`)) {
      deleteEntry(entryObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="not-completed">
      <Card.Header as="h5" style={{ fontWeight: 'bolder' }}>  Date: {entryObj.date}</Card.Header>
      <Card.Body>
        <Card.Title>{entryObj.category}</Card.Title>
        <Card.Text>
          {entryObj.jotSheet}
        </Card.Text>
        <div>
          <Dropdown>
            <Dropdown.Toggle className="btn-orange-outline" variant="outline-dark" id="dropdown-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href={`/journalEntry/edit/${entryObj.firebaseKey}`} passHref>Edit</Dropdown.Item>
              <Dropdown.Item onClick={deleteThisJournalEntry}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
  onUpdate: PropTypes.func.isRequired,
};
