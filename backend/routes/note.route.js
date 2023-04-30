const express = require('express');
const router = express.Router();
const Joi = require('joi');
const headers = require('../scripts/headers.script');
const crypto = require('crypto');

const note_controller = require('../controllers/note.controller');

const validation_error_response = {response: 400, error: 'Invalid request.'};
const unauthorized_response = {response: 401, error: 'This key is invalid or expired. Are you logged in?'}
const internal_error_response = {response: 500, error: 'Internal error occurred.'};


// POST /create

const create_schema = Joi.object().keys({
    sphere_id: Joi.number().optional(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    type_id: Joi.number().required(),
    user_id: Joi.number().required(),
})

router.post('/create', (req, res) => {
    console.log('POST /note/create');

    const {error, value} = create_schema.validate(req.body);
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
        sphere_id: value.sphere_id,
        title: value.title,
        desc: value.desc,
        type_id: value.type_id,
        time: Date.now(),
        user_id: value.user_id
    };

    note_controller.create(note)
        .then(() => {
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


const edit_schema = Joi.object().keys({
    note_uuid: Joi.string().required(),
    sphere_id: Joi.number().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    type_id: Joi.number().required(),
    user_id: Joi.number().required(),
})

router.post('/edit', (req, res) => {
    console.log('POST /note/edit');

    const {error, value} = edit_schema.validate(req.body);
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
        id: value.note_uuid,
        sphere_id: value.sphere_id,
        title: value.title,
        desc: value.desc,
        type_id: value.type_id,
        time: Date.now(),
        user_id: value.user_id
    };

    note_controller.edit(note)
        .then(() => {
            // The request was successful
            const success_response = {
                response: 200,
                note: note,
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

const delete_schema = Joi.object().keys({
    note_uuid: Joi.string().required(),
    user_id: Joi.number().required()
})

router.post('/delete', (req, res) => {
    console.log('POST /note/delete');

    const {error, value} = delete_schema.validate(req.body);

    if (error) {
        res.writeHead(400, headers.JSON);
        res.end(JSON.stringify(validation_error_response));
        return;
    }
    if (false) {
        res.writeHead(401, headers.JSON);
        res.end(JSON.stringify(unauthorized_response));
        return;
    }

    note_controller.delete(value.uuid, value.user_id)
        .then(() => {
            // The request was successful
            const success_response = {
                response: 200
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