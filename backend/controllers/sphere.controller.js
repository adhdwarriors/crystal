const {mongo} = require("./mongo.controller");

async function getSphereIdOf(title) {
  const result = await mongo().db('whatsgood').collection('spheres')
    .findOne({title: {$regex: new RegExp(title, 'i')}});
  return result.id;
}

async function getSpheres() {
  const result = await mongo().db('whatsgood').collection('spheres')
    .find({})
    .toArray();
  return result.map(obj => obj.title);
}

exports.getSphereIdOf = getSphereIdOf;
exports.getSpheres = getSpheres;