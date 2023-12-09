import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createNote, updateNote } from '../../api/notepadData';

const initialState = {
  date: '',
  jotSheet: '',
  noteClosed: false,
};

function NoteForm({ noteObj }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [noteFormInput, setNoteFormInput] = useState({ ...initialState, musicId: firebaseKey });

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

    if (noteObj.firebaseKey) {
      updateNote(noteFormInput).then(() => router.push(`/music/${noteObj.musicId}`));
    } else {
      const payload = { ...noteFormInput };
      createNote(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateNote(patchPayload).then(() => {
          router.push(`/music/${firebaseKey}`);
        });
      });
    }
  };

  useEffect(() => {
    if (noteObj.firebaseKey) setNoteFormInput(noteObj);
  }, [noteObj]);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <h5>Notepad Date</h5>
            <Form.Control type="date" name="date" value={noteFormInput.date} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Mark this Notepad as Closed"
              name="noteClosed"
              checked={noteFormInput.noteClosed}
              onChange={(e) => {
                setNoteFormInput((prevState) => ({
                  ...prevState,
                  noteClosed: e.target.checked,
                }));
              }}
            />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group controlId="exampleForm.ControlTextarea1" name="noteClosed">
            <h5>Jot Sheet</h5>
            <Form.Control as="textarea" rows={7} name="jotSheet" value={noteFormInput.jotSheet} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '30px' }} />
          <Button className="btn-orange" variant="dark" type="submit">
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
    musicId: PropTypes.string,
  }),
};

NoteForm.defaultProps = {
  noteObj: initialState,
};

export default NoteForm;
