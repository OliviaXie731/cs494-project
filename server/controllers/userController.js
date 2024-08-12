const db = require('../models/dbModel');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const userController = {};

// create new user
userController.addUser = async(req, res, next) => {
    try {
        const {username, email, password} = req.body;

        // first check required username, email, and password
        if (!username || !email || !password) {
            return next({
                log: 'Missing or invalid required field',
                status: 400,
                message: {err: 'username, email, password are required'}
            })
        }

        // check username and password are unique
        const selectQuery = `
            SELECT *
            FROM users
            WHERE username = $1 OR email = $2
            `
        const uniqueQueryData = await db.query(selectQuery, [username, email]);
        if (uniqueQueryData.rows.length > 0) {

            return next({
                log: 'username and password must be unique',
                status: 400,
                message: {err: 'username and password must be unique'}
            });
        }
        
        // add to the database
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const attributes = [username, email, hashedPassword];
        const addUserQuery = ` 
            INSERT INTO users (username, email, password) 
            VALUES ($1, $2, $3)
            RETURNING *;`
        
        const addUserData = await db.query(addUserQuery, attributes);
        res.locals.newUser = addUserData.rows[0];
        //console.log(res.locals.newUser);
        return next();
    } catch(err) {
        return next({
            log: `Error in userController.addUser: ${err}`,
            message: {err: 'unable to add new user data'},
        });
    }
}

userController.verifyUser = async(req, res, next) => {
    try {
        const {username, password} = req.body;

        // must input username and password
        if (!username || !password) {
            return next({
                log: 'Missing or invalid required field',
                status: 400,
                message: {err: 'username, password are required'}
            })
        }

        // verify whether the user exists
        const searchQuery = `
            SELECT password, user_id, username 
            From users 
            WHERE username = $1`;
        const searchResult = await db.query(searchQuery, [username]);
        if ((searchResult).rows.length === 0) {
            return res.status(401).json({err: 'No such user exists'});
        } 
        
        // compare the password is correct
        const isMatch = await bcrypt.compare(password, searchResult.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({err: 'Invalid password'});
        }
        res.locals.verifyUser = searchResult.rows[0];
        return next();
    }catch(err) {
        return next({
            log : 'Error in userController.verifyUser: ' + JSON.stringify(err),
            message: {err: 'unable to verify user'}
        });
    }
};

userController.changePassword = async(req, res, next) => {
    try {
        const {username, email, newPassword} = req.body;

        // check username, email, newpassword is not null
        if (!username || !email || !newPassword) {
            return next({
                log: 'Missing or invalid required field',
                status: 400,
                message: {err: 'username, email, newPassword are required'}
            })
        }

        // check username and email is correct
        const searchQuery = `
            SELECT * 
            FROM users 
            WHERE username = $1 AND email = $2
        `;
        const searchResult = await db.query(searchQuery, [username, email]);
        if (searchResult.rows.length === 0) {
            return res.status(401).json({err: 'username and password not match'});
        }

        // check the password is not equal to previous one
        const isMatch = await bcrypt.compare(newPassword, searchResult.rows[0].password);
        if (isMatch) {
            return res.status(401).json({err: 'can not use the same password before'});
        }

        // update passowrd
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const updateQuery = `
            UPDATE users 
            SET password = $1 
            WHERE username = $2 AND email = $3`
        await db.query(updateQuery, [hashedPassword, username, email]);
        return next();

    } catch(err) {
        return next({
            log : 'Error in userController.changePassword: ' + JSON.stringify(err),
            message: {err: 'unable to change password'}
        });
    }
}

userController.deleteUser = async(req, res, next) => {
    
}


module.exports = userController;