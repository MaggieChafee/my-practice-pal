import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createNote, updateNote } from '../../api/notepadData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  date: '',
  jotSheet: '',
  noteClosed: false,
};

function NoteForm({ noteObj }) {
  const [noteFormInput, setNoteFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteFormInput((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...noteFormInput, uid: user.uid };
    createNote(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateNote(patchPayload).then(() => {
        router.push('/');
      });
    });
  };

  console.warn(router);

  useEffect(() => {
    if (noteObj.firebaseKey) setNoteFormInput(noteObj);
  }, [noteObj]);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Notepad Date - Date Picker to be added</Form.Label>
            <Form.Control type="text" name="date" value={noteFormInput.date} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Mark this Notepad as Closed" name="date" value={noteFormInput.date} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" name="noteClosed" value={noteFormInput.noteClosed} onChange={handleChange}>
            <Form.Label>Jot Sheet</Form.Label>
            <Form.Control as="textarea" rows={7} name="jotSheet" value={noteFormInput.jotSheet} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {noteObj.firebaseKey ? 'Update' : 'Create'} Notepad
          </Button>
        </Form>
      </div>
    </>
  );
}

NoteForm.propTypes = {
  noteObj: PropTypes.shape({
    date: PropTypes.string,
    jotSheet: PropTypes.string,
    noteClosed: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

NoteForm.defaultProps = {
  noteObj: initialState,
};

export default NoteForm;
