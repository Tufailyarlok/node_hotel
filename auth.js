const passport = require('passport');
const personModel = require('./models/person')

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  try {
    console.log('Received :', USERNAME, password);
    const user = await personModel.findOne({ username: USERNAME });

    if (!user) { return done(null, false, { message: 'incorrect username.' }); }

    const isPasswordMatch =await user.comparePassword(password);

    if (isPasswordMatch) { return done(null, user) }
    else { return done(null, false, { message: "incorrect password" }) }
  }
  catch (err) {
    return done(err);
  }
}))
 
module.exports=passport;