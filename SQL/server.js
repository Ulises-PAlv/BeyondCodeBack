// ?? Dependencias
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const fs = require('fs');
const multer = require('multer');

var nodemailer = require('nodemailer');
app.use(cors());

// ?? Inicializar Server
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const port = process.env.PORT || 3000;
var jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log('Running on port:', port);
});

app.get('/', (req, res) => {
    res.send({
        data: '200: Running...'
    })
});

// ?? MySQL Auth
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'beyondcode'
}

app.use(myconn(mysql, dbOptions, 'single'));

// ?? CRUD ################################################
// ** Users
app.get('/users', (req, res) => { // !! All users
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM users', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/user/:id', (req, res) => { // !! One user
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/user', jsonParser, (req, res) => { // !! Add user
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO users set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

// ** Projects
app.get('/projects', (req, res) => { // !! All projects
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM projects', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.get('/project/:id', (req, res) => { // !! One project
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM projects WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/project', jsonParser, (req, res) => { // !! Add prject
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO projects set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

// ** Teams
app.get('/members', (req, res) => { // !! All members
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM teams', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.get('/team/:teamID', (req, res) => { // !! One team
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM teams WHERE project_id = ${req.params.teamID}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/member', jsonParser, (req, res) => { // !! Add member
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO teams set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.delete('/member/:userID', (req, res) => { // !! Remove member
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`DELETE FROM teams WHERE user_id = ${req.params.userID}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

// ?? ######################################################

// ?? Mailer
/*
app.get('/send/:email', (req, res) => {
    const email = req.params.email.toString();
    setData(email);
    res.send("Correo enviado exitosamente")
});

function setData(mailDestiny) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmailer.thomanson@gmail.com',
            pass: 'wdcdycvhzpsxnyrk'
        }
    });

    var mailOptions = {
        from: 'testmailer.thomanson@gmail.com',
        to: mailDestiny,
        subject: 'Empleon : Solicitud de contacto',
        html: '<img src="cid:logo" style="width: 25px; height: auto; display: inline;"><h4 style="display: inline; margin-left: 10px;">Gracias por comunicarte, en la brevedad nos contactaremos contigo</h4><p>Atte: Admin</p> <img src="cid:sign" style="width: 250px; height: auto;">',
        attachments: [{
            filename: 'logo.jpeg',
            path: __dirname + '/assets/logo.jpeg',
            cid: 'logo'
        },
        {
            filename: 'sign.png',
            path: __dirname + '/assets/sign.png',
            cid: 'sign'
        }]
    };

    sendMail(transporter, mailOptions);
}

function sendMail(transporter, opt) {
    transporter.sendMail(opt, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
*/