const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const jwt = require('jsonwebtoken');



module.exports = {
    createUser: (req, res, next) => {
        console.log(`Create user called`);
        bcrypt.hash(req.body.password, saltRounds).then( hash =>
            User.create({email:req.body.email, hash:hash}).then(user => res.status(200).json({"success":`successfully created user for ${user.email}`}))
        ).catch(err => res.status(400).json({"error": `${err}`}));      
    },

    validateUser: (req, res, next) => {
        console.log(`Validate user called`)
        User.findOne({email:req.body.email}).then(user => {
            console.log(user)
            bcrypt.compare(req.body.password, user.hash, function(err, succeeded) {
                console.log(succeeded)
                if(succeeded) {
                    let expiry = new Date();
                    expiry.setDate(expiry.getDate()+1);
                    let token = jwt.sign({
                        email:user.email,
                        exp: parseInt(expiry.getTime()/1000)
                    }, "mySuperSecretSecret");
                    res.status(200).json({"success":`Successfully authenticated ${user.email}`,"token": token})
                }
                else {
                    res.status(400).json({"error": "Wrong password"});
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({"error":`${err}`})
            })
        })
    }
} 