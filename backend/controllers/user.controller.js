const {firestore} = require('./firestore.controller');

async function get(user_id) {
  const doc = firestore.collection("users").doc(`${user_id}`);
  return await doc.get();
}

exports.get = get;