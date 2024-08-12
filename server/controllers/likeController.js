const db = require('../models/dbModel.js');
const likeController = {};

likeController.addLike = async(req, res, next) => {
    try {
        const { user_id, movie_id } = req.body;
        if (!user_id || !movie_id) {
            return next({
                log: 'Missing or invalid required field',
                status: 400,
                message: { err: 'userId and movieId are required' }
            });
        } 

        const addLikeQuery = `
            INSERT INTO likes (user_id, movie_id, liked_at)
            VALUES ($1, $2, NOW())
            RETURNING *;
        `;

        const addLikeData = await db.query(addLikeQuery, [user_id, movie_id]);
        res.locals.newLike = addLikeData.rows[0];
        return next();
    } catch (err) {
        return next({
            log: `Error in likeController.addLike: ${err}`,
            message: { err: 'unable to add like data' },
        });
    }
};
likeController.removeLike = async(req, res, next) => {
    try {
        const { user_id, movie_id } = req.body;
        if (!user_id || !movie_id) {
            return next({
                log: 'Missing or invalid required field',
                status: 400,
                message: { err: 'userId and movieId are required' }
            });
        }
        const deleteQuery = `
            DELETE FROM likes
            WHERE user_id = $1 AND movie_id = $2
            RETURNING *;
        `
        const removeLikeData = await db.query(deleteQuery, [user_id, movie_id]);
        if (removeLikeData.rows.length === 0) {
            return res.status(404).json({ err: 'Like not found' });
        }
        res.locals.removeLike = removeLikeData.rows[0];
        return next();
    } catch(err) {
        return next({
            log: `Error in likeController.removeLike: ${err}`,
            message: { err: 'unable to remove like data' },  
        })
    }
};
likeController.displayLike = async(req, res, next) => {
    try {
        const userId  = req.params.userId;
        if (!userId) {
            return next({
                log: 'Missing or invalid required field',
                status: 400,
                message: { err: 'userId is required' }
            });
        }
        const getUserLikesQuery = `
            SELECT movie_id
            FROM likes
            WHERE user_id = $1
        `
        const userLikeData = await db.query(getUserLikesQuery, [userId]);
        res.locals.userLikes = userLikeData.rows;
        return next();
    } catch(err) {
        return next({
            log: `Error in likeController.getUserLikes: ${err}`,
            message: { err: 'unable to get user likes' },
        });
    }
};
likeController.checkLike = async(req, res) => {
    const { user_id, movie_id } = req.body;
    const result = await db.query('SELECT * FROM likes WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id]);

    if (result.rows.length > 0) {
        res.json({ isFavorited: true });
    } else {
        res.json({ isFavorited: false });
    }
};
likeController.totalLike = async(req, res) => {
    const { user_id } = req.body;
    const result = await db.query('SELECT * FROM likes WHERE user_id = $1', [user_id]);
    res.json(result.rows.length);
}

module.exports = likeController;