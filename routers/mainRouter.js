const express = require('express');
const passport = require('passport');
const homeController = require('../controllers/homeController');
const Router = express.Router();
Router.get('/', (req, res) => {
    return res.render('home');
});
Router.get('/register-w', homeController.registerGetw);
Router.post('/register-w', homeController.registerPostw)
Router.get('/login-w', homeController.loginGetw);
Router.post('/login-w', homeController.loginPostw);
Router.get('/register-s', homeController.registerGets);
Router.post('/register-s', homeController.registerPosts);
Router.get('/login-s', homeController.loginGets);
Router.post('/login-s', homeController.loginPosts);
Router.post('/', homeController.handleFeedback);
Router.get('/string/:id', homeController.doneWork);
Router.get('/workerProfile/:id', homeController.workerRender)
module.exports = Router;