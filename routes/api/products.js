const { response } = require('express');
const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Product = require('../../models/Product');


// const validateNewJournal = require('../../validation/newJournal');



router.get('/', passport.authenticate('jwt', {session: false}),  (req, res) => {
    Product.find()
        .then(products => {
            if (products.length === 0) res.json({ none: true });
            else res.json(products)
        })
        .catch(err =>
            res.status(404).json({ products: 'No products found???' })
        );
    
});



router.post('/new', (req,res) => {
    Product.findOne({ 
        name: req.body.name, 
        user_id: req.body.user_id 
    })

    .then(product => {
        if (product) {
          const errors = {
              product: 'You already have a product with that name.'
          }
          console.log(errors)
          return res.status(400).json(errors);
        } else {

            const product = new Product({
                name: req.body.name,
                user_id: req.body.user_id,
            })
            
            product.save()
            .then(() => res.json(product))
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
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err){
            return res.status(400).json(err)
        }
        else{
            res.json(product)
        }
    });
});


module.exports = router;