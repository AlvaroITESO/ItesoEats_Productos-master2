const Review = require('./review');

const ReviewCtrl = {};

reviewCtrl.getReviews = async (req, res, next) => {
    const reviews = await Review.find();
    res.json(reviews);
};

reviewCtrl.createReview= async (req, res, next) => {
    const review = new Review({
        name: req.body.name,
        message: req.body.message,
        rate: req.body.rate
    });
    await review.save();
    res.json({status: 'Review created'});
};

reviewCtrl.getReviews = async (req, res, next) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.json(review);
};

reviewCtrl.editReview = async (req, res, next) => {
    const { id } = req.params;
    const review = {
        name: req.body.name,
        message: req.body.message,
        rate: req.body.rate
    };
    await Review.findByIdAndUpdate(id, {$set: review}, {new: true});
    res.json({status: 'Review Updated'});
};

reviewCtrl.deleteReview = async (req, res, next) => {
    await Review.findByIdAndRemove(req.params.id);
    res.json({status: 'Review Deleted'});
};

module.exports = reviewCtrl;