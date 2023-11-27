import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMusic, updateMusic } from '../../api/musicData';

const initialState = {
  name: '',
  composer: '',
  category: '',
  musicCompleted: false,
  startDate: '',
  recording: '',
};

function MusicForm({ musicObj }) {
  const [musicFormInput, setMusicFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMusicFormInput((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (musicObj.firebaseKey) {
      updateMusic(musicFormInput).then(() => router.push(`/music/${musicObj.firebaseKey}`));
    } else {
      const payload = { ...musicFormInput, uid: user.uid };
      createMusic(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMusic(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  useEffect(() => {
    if (musicObj.firebaseKey) setMusicFormInput(musicObj);
  }, [musicObj]);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name of Piece</Form.Label>
            <Form.Control type="text" name="name" value={musicFormInput.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Composer</Form.Label>
            <Form.Control type="text" name="composer" value={musicFormInput.composer} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={musicFormInput.category} onChange={handleChange}>
              <option>Select a Category</option>
              <option>Warm-Up</option>
              <option>Scale</option>
              <option>Etude</option>
              <option>Solo Repertoire</option>
              <option>Chamber Ensemble</option>
              <option>Large Ensemble</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Reference Recording</Form.Label>
            <Form.Control type="text" name="recording" value={musicFormInput.recording} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Start Date - Change to Date Picker</Form.Label>
            <Form.Control type="text" name="startDate" value={musicFormInput.startDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I've completed the piece!" name="musicCompleted" value={musicFormInput.musicCompleted} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {musicObj.firebaseKey ? 'Update' : 'Create'} Music
          </Button>
        </Form>
      </div>
    </>
  );
}

MusicForm.propTypes = {
  musicObj: PropTypes.shape({
    name: PropTypes.string,
    composer: PropTypes.string,
    category: PropTypes.string,
    startDate: PropTypes.string,
    musicCompleted: PropTypes.bool,
    recording: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MusicForm.defaultProps = {
  musicObj: initialState,
};

export default MusicForm;
