const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app1Port = 4000;
const app2Port = 4010;

const app1 = express();
const app2 = express();

app1.use(cookieParser());
app2.use(cookieParser());

// Enable CORS for specific origin
app1.use(cors({
    origin: true,
    credentials: true
}));
app2.use(cors({
    origin: true,
    credentials: true
}));

app1.options('*', cors());
app2.options('*', cors());

app1.post('/login', (req, res) => {
    res.cookie('token', 'true', {
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'none'
    });

    res.send('Cookie set for Client 1');
});

app1.post('/logout', (req, res) => {
    console.log('logout 1', req.hostname);
    res.clearCookie('token', { domain: req.hostname });
    res.send('Logged out from Client 1');
});

app2.post('/login', (req, res) => {
    res.cookie('token', 'true', {
        domain: '.favinsta.com',
        httpOnly: false,
        secure: false
    });

    res.send('Cookie set for Client 2');
});

app1.get('/checkLoggedIn', (req, res) => {
    if (req.cookies.token === 'true') {
        res.send('User is logged in to Client 1');
    } else {
        res.status(400).send('User is not logged in to Client 1');
    }
});

app2.get('/checkLoggedIn', (req, res) => {
    console.log(req.cookies.token, 'app2 check');
    if (req.cookies.token === 'true') {
        res.send('User is logged in to Client 2');
    } else {
        res.status(400).send('User is not logged in to Client 2');
    }
});

app1.listen(app1Port, () => console.log(`Server running on port ${app1Port} for Client 1`));
app2.listen(app2Port, () => console.log(`Server running on port ${app2Port} for Client 2`));
