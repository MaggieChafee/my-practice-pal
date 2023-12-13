import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleGoal = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/goal/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getGoalsByJournalId = (journalId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/goal.json?orderBy="journalId"&equalTo="${journalId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteGoal = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/goal/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createGoal = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/goal.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateGoal = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/goal/${payload.firebaseKey}.json`, {
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
  getSingleGoal, getGoalsByJournalId, createGoal, updateGoal, deleteGoal,
};
