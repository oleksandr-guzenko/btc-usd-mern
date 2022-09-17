const express = require("express");
const router = express.Router()
const passport = require("passport");
const axios = require('axios');

// Load User model
const User = require("../../models/User");
const Record = require("../../models/Record");
const mongoose = require('mongoose');
const api = 'https://api.coinbase.com/v2/prices/BTC-USD/spot';
let guessUsers = [];


// @route POST api/guess
// @access Private
router.post("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    const index = guessUsers.findIndex(value => value === req.user._id.toString());

    if(index === -1) {
        guessUsers.push(req.user._id.toString());

        User
        .findById(req.user._id)
        .then(user => {
            setTimeout(() => {
            const { before, mode } = req.body;
            const timer = setInterval(() => {
                    getData(api, before, mode, req.user._id.toString(), res, timer);
                }, 1000);
            }, 1000);
        })
        .catch(err => console.log(err));
    } else {
        return res.status(500).json('You have to wait for your guess completion.');
    }
});

router.get('/records', passport.authenticate('jwt', {session: false}), (req, res) => {
    Record
        .find({user: req.user._id})
        .then(records => res.json(records))
        .catch(err => console.log(err));
});

const getData = (api, before, mode, userId, res, timer) => {
    axios
        .get(api)
        .then(result => {
            const after = result.data.data.amount;

            if(after != before) {
                clearInterval(timer);
                const index = guessUsers.findIndex(value => value === userId);

                if(index !== -1) {
                    guessUsers.splice(index, 1);
                    let guessResult = false;
    
                    if((after > before && mode === 'up') || (after < before && mode === 'down')) guessResult = true;
                    
                    new Record({
                        before: before,
                        after: after,
                        mode: mode,
                        guessResult: guessResult,
                        user: userId
                    })
                    .save()
                    .then(record => res.json(record))
                    .catch(err => console.log(err));
                    }
            }
        })
        .catch(err => console.log(err));
}

module.exports = router;
