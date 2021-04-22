const { response } = require('express');
const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const TrackEntry = require('../../models/TrackEntry');


// const validateNewJournal = require('../../validation/newJournal');



router.get('/:id',  (req, res) => {
    TrackEntry.find({track_id: req.params.id})
      .then(entries => {
          res.json({track_id: req.params.id, entries})
      })
      .catch(err => {
          res.status(404).json(err)
      })
    
});



router.post('/', (req,res) => {
    // TrackEntry.findOne({ 
    //     name: req.body.name, 
    //     user_id: req.body.user_id 
    // })

    
    // .then(track => {
    //     if (track) {
    //       const errors = {
    //           track: 'You already have a journal with that name.'
    //       }
    //       console.log(errors)
    //       return res.status(400).json(errors);
    //     } else {

            const entry = new TrackEntry({
                rating: req.body.rating,
                text: req.body.text,
                track_id: req.body.track_id,
                date: req.body.date
            })
            
            entry.save()
            .then(() => res.json(entry))
            .catch(err => res.status(404).json(err))
    //     }
    // })
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