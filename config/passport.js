// // const mongoose = require('mongoose');
// const Worker = require('../models/worker');

// console.log('herer');
// const localStrategy = require('passport-local').Strategy;
// const passport = require('passport');

// function initializePassport(passport) {
//     const authenticateUser = async (contact, password, done) => {
//         Worker.findOne({ contact: contact }, function (err, worker) {
//             console.log(worker);
//             if (err) {
//                 console.error(err);
//                 return done(err);

//             }
//             else {
//                 if (!worker) {
//                     console.log('no user of that name ');
//                     return done(null, false);
//                 }

//                 const pass = worker.password;
//                 if (password == pass) {
//                     return done(null, worker);
//                 }
//                 else {
//                     console.log('incorrect password: ');
//                     return done(null, false);
//                 }
//             }
//         })

//     }
//     passport.use(new localStrategy('Worker', { usernameFi }, authenticateUser))
//     passport.serializeUser((worker, done) => {
//         console.log('error');
//         return done(null, worker._id);
//     })
//     passport.deserializeUser = ((id, done) => {
//         Worker.findById(id, (err, worker) => {
//             if (err) {

//                 console.error(err);
//                 return done(err);
//             }
//             console.log('error');
//             return done(null, worker);
//         })
//     })
// }

// module.exports = initializePassport;