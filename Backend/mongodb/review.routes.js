const express = require('express');
const router = express.Router();

const review = require('./review.controller');

router.get('/', review.getReviews);
router.post('/', review.createReview);
router.get('/:id', review.getReview);
router.put('/:id', review.editReview);
router.delete('/:id', review.deleteReview);

module.exports = router;