const express = require('express');

const app = express();

require('./startup/routes')(app);

app.listen(8080);
