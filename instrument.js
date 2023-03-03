const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const app = express();
const { Pool } = require('pg');
app.use(express.json());

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'instrument',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: 5432
})
app.use(express.static('public'));
app.get("/api/users", (req, res) => {
    pool.query('SELECT * from users', (err, result) => {
        if (err) {
            return res.sendStatus(400);
        }
        else {
            const rows = result.rows;
            res.send(rows);
        }
    });
})
app.get("/api/instruments", (req, res) => {
    pool.query('SELECT * from instruments', (err, result) => {
        if (err) {
            return res.sendStatus(400);
        }
        else {
            const rows = result.rows;
            res.send(rows);
        }
    });
})

app.get("/api/users/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT first_name, last_name, age FROM users WHERE user_key = ' + id + ';', (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            const user = result.rows[0];
            res.send(user);
        }
    })
})
app.get("/api/instruments/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT type, make, model FROM instruments WHERE user_key = ' + id + ';', (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            const user = result.rows[0];
            res.send(user);
        }
    })
})
app.post("/api/users", (req, res) => {
    let keys = Object.keys(req.body);
    let keysStr = keys.join(', ');
    pool.query("INSERT INTO users (" + keysStr + ") VALUES ($1, $2, $3, $4)",[req.body.first_name, req.body.last_name, req.body.age, req.body.user_key], (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            res.send(req.body);
        }
    })
})
app.post("/api/instruments", (req, res) => {
    const id = Number.parseInt(req.params.id);
    let keys = Object.keys(req.body);
    let keysStr = keys.join(', ');
    let valuesArr = [req.body.type, req.body.make, req.body.model, req.body.user_key]
    pool.query("INSERT INTO instruments (" + keysStr + ") VALUES ($1, $2, $3, $4)",[req.body.type, req.body.make, req.body.model, req.body.user_key], (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            res.send(req.body);
        }
    })
})
app.patch("/api/users/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (req.body.first_name) {
        pool.query("UPDATE users SET first_name = $2 WHERE user_key = $1",[id, req.body.first_name], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.last_name){
        pool.query("UPDATE users SET last_name = $2 WHERE user_key = $1",[id, req.body.last_name], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.age){
        pool.query("UPDATE users SET age = $2 WHERE user_key = $1",[id, req.body.age], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    res.send("Update Complete");
})
app.patch("/api/instruments/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    if (req.body.type) {
        pool.query("UPDATE users SET type = $2 WHERE user_key = $1",[id, req.body.type], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.make){
        pool.query("UPDATE users SET make = $2 WHERE user_key = $1",[id, req.body.make], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.model){
        pool.query("UPDATE users SET model = $2 WHERE user_key = $1",[id, req.body.model], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    res.send("Update Complete");
})
app.delete("/api/users/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE user_key = $1', [id], (err, data) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.send("Data Deleted");
        }
    })  
})
app.delete("/api/instruments/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('DELETE FROM instruments WHERE user_key = $1', [id], (err, data) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.send("Data Deleted");
        }
    })  
})
app.listen(8000, () => {
    console.log('server is running');
})