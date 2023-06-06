require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.post('/login', function(req, res) {

});

app.listen(PORT, function() {
    console.info('server running at port:', PORT);
});
