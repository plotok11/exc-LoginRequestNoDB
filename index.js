const express = require('express')
// Allowing user to be the part of request using express-session
const session = require('express-session')
const { Passport } = require('passport/lib')
const passport = require('passport')
const app = express()
const port = 5000

const clientSecret = 'GOOGLE_CLIENT_SECRET'
// Allowing user session
// For the secret use env variable
app.use(session({secret: clientSecret}))
app.use(passport.initialize())
app.use(passport.session())

// Middleware Funtion to check if the user is logged in or not
// Check if the request has a user, if does do next(), if note sendstatus error(401)
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

require('./auth')

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate With Google</a>');
})

// Direct user to auth google, this case endpoint is google
// Pass in scope defining info we want to retrieve
// Reminder to use API credentials from google and set callback endpoint
// It will req get from the /google/callback define the endpoint and behaviour
app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
)

// Defining google callback after authentication
// Redirect if the auth succes and failure don't forget to define the endpoint
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

// Defining if the authentication failure
app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong!!')
})

// Redirect if the auth success
// You can't go here if youre not autheticated
// Add isLoggedIn middleware function
app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello! ${req.user.displayName}`)
})

// Logging Out
app.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send('Goodbye!! Sucessfully logout')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})