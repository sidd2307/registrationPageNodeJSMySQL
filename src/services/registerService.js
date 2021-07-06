import connection from "../configs/connectDB"
import bcryptjs from "bcryptjs"
import { reject } from "async";
import e from "connect-flash";

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist in db or not
            let check = await checkEmailUser(user.email);
            if(check){
                reject(`This email "${user.email}" already exists. Please choose another email!`)
            }
            else{
                // hash the users password
                let salt = bcryptjs.genSaltSync(10);
                let data = {
                    fullname: user.fullname,
                    email: user.email,
                    password: bcryptjs.hashSync(user.password, salt)
                }

                connection.query("INSERT INTO users set ? ", data, function(error, rows) {
                    if(error){
                        reject(error)
                    }
                    resolve("Created a new user successfully!")
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where email = ?", email, function(error, rows){
                if(error){
                    reject(error);
                }
                if(rows.length > 0){
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser
}