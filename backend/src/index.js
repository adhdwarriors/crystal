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