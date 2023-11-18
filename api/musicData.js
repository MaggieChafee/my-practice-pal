import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMusicByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getOpenMusic = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music.json?orderBy="musicCompleted"&equalTo=false`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getClosedMusic = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/music.json?orderBy="musicCompleted"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
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
  getClosedMusic, getMusicByUid, getOpenMusic, getSingleMusic, createMusic, updateMusic,
};
