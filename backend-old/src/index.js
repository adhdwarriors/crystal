const PORT = 3000;
// .env
require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

// Routes
app.use('/', require('./routes/index.route'));

app.listen(PORT);
console.log(`Server running on port ${PORT}`);

require('./controllers/openai.controller').test('This is a test!').finally();

const openai_controller = require('./controllers/openai.controller.js');

