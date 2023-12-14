/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleNote } from '../../api/notepadData';

function NotepadCard({ noteObj, onUpdate }) {
  const deleteThisNote = () => {
    if (window.confirm('Do you want to delete this practice journal?')) {
      deleteSingleNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };
  const checkmark = <FontAwesomeIcon icon={faCheck} size="2xl" style={{ color: '#ed6335' }} />;
  const condition = noteObj.noteClosed;
  const noteResult = condition ? 'completed' : 'not-completed';
  const headResult = condition ? 'card-head-closed' : 'card-head-open';

  return (
    <Card className={noteResult} style={{ width: '20rem' }}>
      <Card.Body>
        <div className={headResult}>
          <Card.Text>{noteObj.noteClosed ? checkmark : ''}</Card.Text>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Journal Date:</h4>
            <h5 style={{ fontWeight: 'bolder' }}>{noteObj.startDate} to {noteObj.endDate}</h5>
          </div>
        </div>
        <div style={{ height: '25px' }} />
        <div className="button-container">
          <Link href={`/journal/details/${noteObj.firebaseKey}`} passHref>
            <Button className="btn-orange" variant="dark">View</Button>
          </Link>
          <div style={{ width: '5px' }} />
          <Dropdown>
            <Dropdown.Toggle className="btn-orange-outline" variant="outline-dark" id="dropdown-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href={`/journal/edit/${noteObj.firebaseKey}`} passHref>Edit</Dropdown.Item>
              <Dropdown.Item onClick={deleteThisNote}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
}

NotepadCard.propTypes = {
  noteObj: PropTypes.shape({
    noteClosed: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NotepadCard;
