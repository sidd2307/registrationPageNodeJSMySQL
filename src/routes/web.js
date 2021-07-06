import express from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
// Changes Start
import homePageController from "../controllers/homePageController"
// Changes End
import auth from "../validation/authValidation";
import passport from "passport"
import initPassportLocal from "../controllers/passportLocalController"

let router = express.Router();

initPassportLocal();


let initWebRoutes = (app) => {
    // Changes Start
    router.get("/", loginController.checkLoggedIn, homePageController.getHomePage);
    router.get("/login", loginController.checkLoggedOut, loginController.getLoginPage)
    // Changes End
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/register", registerController.getRegisterPage)
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    // Changes Start
    router.post("/logout", loginController.postLogOut)
    return app.use("/", router);
};
module.exports = initWebRoutes;
