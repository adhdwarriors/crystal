const express = require('express');
const router = express.Router();
const Joi = require('joi');
const headers = require('../scripts/headers.script');
const crypto = require('crypto');

const note_controller = require('../controllers/note.controller');

const validation_error_response = { response: 400, error: 'Invalid request.' };
const unauthorized_response = { response: 401, error: 'This key is invalid or expired. Are you logged in?' }
const internal_error_response = { response: 500, error: 'Internal error occurred.' };


// POST /create

const create_schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    user_id: Joi.number().required()
})

router.post('/create', (req, res) => {
    console.log('POST /note/create');

    const { error, value } = create_schema.validate(req.body);
    if (error) {
        res.writeHead(400, headers.JSON);
        res.end(JSON.stringify(validation_error_response));
        return;
    }

    // Check if the token is authorized
    if (false) {
        res.writeHead(401, headers.JSON);
        res.end(JSON.stringify(unauthorized_response));
        return;
    }

    const note = {
        id: crypto.randomUUID(),
        title: value.title,
        content: value.content,
        time: Date.now()
    };

    note_controller.create(note, value.user_id)
        .then(result => {
            console.log(result);
            // The request was successful
            const success_response = {
                response: 200,
                note: note,
                user_id: value.user_id
            };
            res.writeHead(200, headers.JSON);
            res.end(JSON.stringify(success_response));
        })
        .catch(error => {
            // An error occurred
            console.log(error);
            res.writeHead(500, headers.JSON);
            res.end(JSON.stringify(internal_error_response));
        });
});

module.exports = router;