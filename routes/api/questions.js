const { response } = require('express');
const express = require('express');
const router = express.Router();

const Question = require('../../models/question');



router.get('/', (req, res) => {
    Question.find()
        .then(questions => {res.json(questions); res.send('hey')})
        .catch(err =>
            res.status(404).json({ notquestionfound: 'No question found' })
        );
});

router.post('/', (req,res) => {
    const newQuestion = new Question({
        name: req.body.name,
        text: req.body.text,
        link: req.body.link,
        repo: req.body.repo,
    })
    newQuestion.save()
        .then(question => response.json(question))
        .catch(err => res.status(404).json(err))
});

module.exports = router;