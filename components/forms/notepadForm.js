/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createNote, updateNote } from '../../api/notepadData';
import { getSingleMusic } from '../../api/musicData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  startDate: '',
  endDate: '',
  piece: '',
  noteClosed: false,
};

function NotepadForm({ noteObj }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [noteFormInput, setNoteFormInput] = useState({ ...initialState, musicId: firebaseKey });
  const [musicName, setMusicName] = useState({});
  const { user } = useAuth();

  const getMusicName = () => {
    getSingleMusic(firebaseKey).then(setMusicName);
  };

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
      const payload = { ...noteFormInput, piece: musicName?.name, uid: user.uid };
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
    getMusicName();
  }, [noteObj]);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <h5>Journal Start Date</h5>
            <Form.Control type="date" name="startDate" value={noteFormInput.startDate} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group controlId="formBasicEmail">
            <h5>Journal End Date</h5>
            <Form.Control type="date" name="endDate" value={noteFormInput.endDate} onChange={handleChange} />
          </Form.Group>
          <div style={{ height: '15px' }} />
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Mark this Journal as Closed"
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
          <div style={{ height: '30px' }} />
          <Button className="btn-orange" variant="dark" type="submit">
            {noteObj.firebaseKey ? 'Update' : 'Create'} Journal
          </Button>
        </Form>
      </div>
    </>
  );
}

NotepadForm.propTypes = {
  noteObj: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    noteClosed: PropTypes.bool,
    piece: PropTypes.string,
    firebaseKey: PropTypes.string,
    musicId: PropTypes.string,
    uid: PropTypes.string,
  }),
};

NotepadForm.defaultProps = {
  noteObj: initialState,
};

export default NotepadForm;
