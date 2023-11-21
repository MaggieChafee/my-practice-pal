import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMusicByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleMusic = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleMusic = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createMusic = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMusic = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music/${payload.firebaseKey}.json`, {
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
  getMusicByUid, getSingleMusic, createMusic, updateMusic, deleteSingleMusic,
};
