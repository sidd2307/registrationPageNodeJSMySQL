import { emit } from "nodemon";
import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../services/loginService"

let localStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        async (req, email, password, done) => {
            try {
                let user = await loginService.findUserByEmail(email);
                if (!user) {
                    return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`))
                }
                if (user) {
                    //   compare password
                    let match = await loginService.comparePasswordUser(user, password)
                    if (match === true) {
                        return done(null, user, null)
                    }
                    else {
                        return done(null, false, req.flash("errors", match))
                    }
                }
            } catch (e) {
                return done(null, false, err)
            }
        }

    ))
}

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user)
    }).catch(error => {
        return done(error, null)
    })
})

module.exports = initPassportLocal;