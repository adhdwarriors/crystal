const express = require('express');
const router = express.Router();

const headers = require('../scripts/headers.script');

router.get('/', (request, response) => {
  console.log('GET /');
  response.writeHead(200, headers.JSON);
  response.end("crystal-backend");
});

module.exports = router;