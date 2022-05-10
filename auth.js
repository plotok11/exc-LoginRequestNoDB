
// Google Client ID and Google Client Secret
// EnvVariable
const clientID = "GOOGLE_CLIENT_ID"
const clientSecret = "GOOGLE_CLIENT_Secret"
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: clientID, 
    clientSecret: clientSecret,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },

//   Function ini untuk menggunakan Database, menemukan dan membuat akun baru jika belum ada
//   Use access token and refresh token to use any google services
//   define error in null
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(null, profile);
    });
  }
));

// Serialization and Deserializaion of user
passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})