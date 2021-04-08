const { response } = require('express');
const express = require('express');
const router = express.Router();

const Question = require('../../models/question');

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