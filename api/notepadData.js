import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notepad/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getNotesByMusicId = (musicId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notepad.json?orderBy="musicId"&equalTo="${musicId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notepad/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notepad.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notepad/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.JSON)
    .then(resolve)
    .catch(reject);
});

export {
  getNotesByMusicId, getSingleNote, deleteSingleNote, createNote, updateNote,
};
