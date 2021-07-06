import connection from "../configs/connectDB"
import bcrypt from "bcryptjs"
import passport from "passport"

let findUserByEmail = (email) => {
    return new Promise(((resolve, reject) => {
        try {
            connection.query("SELECT * from users where email=?", email, function (error, rows) {
                if (error) {
                    reject(error);
                }
                let user = rows[0];
                resolve(user);
            })
        } catch (e) {
            reject(e)
        }
    }))
}

let comparePasswordUser = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) resolve(true);
            resolve("The password you've entered is incorrect");//changes======================================
        } catch (e) {
            reject(e)
        }
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where id = ?", id, function (error, rows) {
                if (error) reject(error)
                let user = rows[0];
                resolve(user)
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    comparePasswordUser: comparePasswordUser,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
}