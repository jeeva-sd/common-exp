const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app1Port = 4000;

const app1 = express();

app1.use(cookieParser());

app1.use(cors({
    origin: true,
    credentials: true
}));

app1.options('*', cors());

app1.post('/login', (req, res) => {
    res.cookie('token', 'true', {
        domain: '.favinsta.com',
        sameSite: 'lax',
        httpOnly: false,
        // secure: true
    });

    res.send('Cookie set for Client 1');
});

app1.post('/logout', (req, res) => {
    console.log('logout 1', req.hostname);
    res.clearCookie('token', { domain: '.favinsta.com' });
    res.send('Logged out from Client 1');
});

app1.get('/checkLoggedIn', (req, res) => {
    console.log(req.cookies.token);
    if (req.cookies.token === 'true') {
        res.send('User is logged in to Client 1');
    } else {
        res.status(400).send('User is not logged in to Client 1');
    }
});

app1.listen(app1Port, () => console.log(`Server running on port ${app1Port} for Client 1`));