const express = require('express');
const likeController = require('../controllers/likeController');
const router = express.Router();

router.post('/addLike', likeController.addLike, (req, res) => {
    return res.status(200).json(res.locals.newLike);
});
router.get('/getLike/:userId', likeController.displayLike, (req, res) => {
    return res.status(200).json(res.locals.userLikes);
});
router.delete('/deleteLike', likeController.removeLike, (req, res) => {
    return res.status(200).json(res.locals.removeLike );
});
router.post('/checklike', likeController.checkLike);
router.post('/totallist', likeController.totalLike);

module.exports = router;