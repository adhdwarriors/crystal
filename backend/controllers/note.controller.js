const {firestore} = require("./firestore.controller");
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

async function get(user_id) {
    const doc = firestore.collection("users").doc(`${user_id}`)
    return await doc.get();
}


exports.create = create;