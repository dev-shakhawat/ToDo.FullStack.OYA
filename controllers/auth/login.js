const argon = require('argon2');

async function login(req , res){

    try{

        const { email , password } = req.body // get email and password from request body

        const errors = {} // all errors will be stored in this object
        const mailPattern = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/

        if(!email)  errors.emailError = "email is required"  // set email error

        if(email && !mailPattern.test(email))  errors.emailError = "invalid email"  // set email error

        if(!password)  errors.passwordError = "password is required"  // set password error

        // check if there is any error
        if(Object.keys(errors).length > 0) res.status(400).send({ success: false ,  errors })

        let dbPassword = null ; // demo database password 
 

        try {
            if (await argon.verify(dbPassword, password)) {
                
                res.status(200).send({ success: true , message : "login success" })
            } else {
                res.status(400).send({ success: false , message : "invalid password" })
            }
          } catch (err) {
            res.status(500).send({ success: false , message : err.message || "login failed , try again later " })
          }


    }catch(error){

        res.status(500).send({ success: false , message : error.message || "login failed" })

    }

}



module.exports = login