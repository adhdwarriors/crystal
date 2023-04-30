const {firestore} = require("./firestore.controller");
const {mongo} = require('./mongo.controller');
const {FieldValue} = require("@google-cloud/firestore");

// note: {  }
async function create(note, user_id) {
    console.log("Creating note...")
    const doc = firestore.collection("users").doc(`${user_id}`)
    return await doc.update({
        notes: FieldValue.arrayUnion({
            id: note.id,
            title: note.title,
            body: note.content,
            time: note.time
        })
    });
}

async function createMongo(note, user_id) {
    console.log("Creating note...")
    const note_to_insert = {
        id: note.id,
        title: note.title,
        body: note.content,
        time: note.time,
        author: user_id
    }
    await mongo().db('whatsgood').collection('notes')
        .insertOne(note_to_insert);
    await mongo().db('whatsgood').collection('people')
        .updateOne({id: user_id}, {$addToSet: {notes: note.id}})
}


exports.create = createMongo;