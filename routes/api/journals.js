const { response } = require('express');
const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Journal = require('../../models/Journal');


// const validateNewJournal = require('../../validation/newJournal');



// router.get('/', (req, res) => {
//     // Journal.find()
//     //     .then(journals => {res.json(journals); res.send('hey')})
//     //     .catch(err =>
//     //         res.status(404).json({ notquestionfound: 'No journal found' })
//     //     );
//     res.send('heyo')
// });

router.get('/',(req, res) => {
    res.json({
        message: 'hey'
    });
})

router.post('/', (req,res) => {
    const newJournal = new Journal({
        name: req.body.name,
        user_id: req.body.user_id,
    })
    newJournal.save()
        .then(journal => response.json(journal))
        .catch(err => res.status(404).json(err))
});

module.exports = router;