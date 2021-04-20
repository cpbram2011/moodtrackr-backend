const { response } = require('express');
const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Journal = require('../../models/Journal');


// const validateNewJournal = require('../../validation/newJournal');



router.get('/', passport.authenticate('jwt', {session: false}),  (req, res) => {
    Journal.find({user_id: req.user.id})
        .then(journals => res.json(journals))
        .catch(err =>
            res.status(404).json({ notquestionfound: 'No journal found' })
        );
    
});

router.get('/',(req, res) => {
    res.json({
        message: 'wat'
    });
})

router.post('/new', (req,res) => {
    Journal.findOne({ 
        name: req.body.name, 
        user_id: req.body.user_id 
    })

    
    .then(journal => {
        if (journal) {
          const errors = {
              journal: 'You already have a journal with that name.'
          }
          console.log(errors)
          return res.status(400).json(errors);
        } else {

            const journal = new Journal({
                name: req.body.name,
                user_id: req.body.user_id,
            })
            
            journal.save()
            .then(() => res.json(journal))
            .catch(err => res.status(404).json(err))
        }
    })


});

module.exports = router;