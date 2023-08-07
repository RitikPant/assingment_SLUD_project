const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const user = require('./routes/user');
const authMiddleware = require('./routes/authMiddleware');
const sequelize = require('./database');

app.use(morgan('tiny'));
app.use(bodyParser.json());

sequelize.sync().then((result) => {
    console.log('Sync completed successfully!');
}).catch((error) => {
    console.log('Error while sequelize sync : ', error);
});

// User registration
app.post('/signup', user.signup);

// User login
app.post('/login', user.login);

// Retrieve user details
app.get('/user', authMiddleware.authenticate, user.getUserDetails);

// Ping request to check the connection
app.get('/ping', (req, res) => {
    return res.send({
        flag: 200,
        message: 'Server is up!'
    });
});

// Start the server
app.listen(4000, () => {
    console.log(`Server started on port 4000`);
});