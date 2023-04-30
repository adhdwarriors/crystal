const {firestore} = require("./firestore.controller");
const {mongo} = require('./mongo.controller');

async function create(sphere) {
    console.log("Creating note...")

    await mongo().db('whatsgood').collection('spheres').insertOne(sphere);
}

async function getIndex() {
    return await mongo().db('whatsgood').collection('spheres').countDocuments();
}


exports.create = create
exports.getIndex = getIndex
