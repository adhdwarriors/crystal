const URL = 'http://172.104.196.152:3000/note/create';

export const createNote = (note, user_id) => {
    // Use fetch to create GET and POST requests
    fetch(URL, {
        method: 'POST', // Specify the method as POST
        headers: { // headers dictate what kind of object you are sending
            'Content-Type': 'application/json'
        },
        // body contains the object in a POST request - in a GET request, use query parameters instead!
        body: JSON.stringify({title: note.title, content: note.content, user_id: user_id})
    })
        .then(response => response.json()) // Converts the response to a JS object
        .then(response => {
            // We send the response code from the backend
            switch (response.response) {
                case 400:
                    // Invalid/malformed request (check body: JSON.stringify(...))
                    return;
                case 401:
                    // Unauthorized (token is not valid)
                    return;
                case 500:
                    // Internal server error
                    return;
                case 200: // Valid request
                    break;
                default: // ???? should never get this
                    return;
            }

            // You can now mess with response however you'd like - look at how the response
            // is structured in the backend to know what variables you can use here
            // In this case, note is stored in /routes/note.route.js, and the success response
            // contains:
            // - response (the response code)
            // - note (an image of the note as seen on the backend)
            // - user_id (the user that sent the backend)
            console.log(response.response);
            console.log(response.note);
            console.log(response.user_id);
        })
        .catch(error => {
            // An error occurred making the request (i.e. no connection, etc.)
            console.log(error);
        });
}