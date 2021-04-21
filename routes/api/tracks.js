const { response } = require('express');
const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Track = require('../../models/Track');


// const validateNewJournal = require('../../validation/newJournal');



router.get('/', passport.authenticate('jwt', {session: false}),  (req, res) => {
    Track.find({user_id: req.user.id})
        .then(tracks => {
            if (tracks.length === 0) res.json({ tracks: 'No tracks found???' });
            else res.json(tracks)
        })
        .catch(err =>
            res.status(404).json({ tracks: 'No journal found???' })
        );
    
});



router.post('/new', (req,res) => {
    Track.findOne({ 
        name: req.body.name, 
        user_id: req.body.user_id 
    })

    
    .then(track => {
        if (track) {
          const errors = {
              track: 'You already have a journal with that name.'
          }
          console.log(errors)
          return res.status(400).json(errors);
        } else {

            const track = new Track({
                name: req.body.name,
                user_id: req.body.user_id,
            })
            
            track.save()
            .then(() => res.json(track))
            .catch(err => res.status(404).json(err))
        }
    })


});

router.delete('/:id', (req, res) => {
//     const userIndex = getUserIndex(req.params.userId)
   
//     if (userIndex === -1) return res.status(404).json({})
   
//     users.splice(userIndex, 1)
//     res.json(users)
//    })
    Track.findByIdAndDelete(req.params.id, (err, track) => {
        if (err){
            return res.status(400).json(err)
        }
        else{
            res.json(track)
        }
    });
});


module.exports = router;