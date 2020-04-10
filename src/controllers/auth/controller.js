const { User } = require('../../config/sequelize')
const bcrypt = require('bcrypt')
const saltRounds = 10;

class Authentication {
    renderLoginPage(req, res) {
        if (req.session.user) {
            res.redirect('/dashboard')
        } else {
            res.render('login', {
                title: "Etutoring",
                thisPageStyleSheets: ['../css/pages/login/login-1.css'], 
                thisPageScripts: ['../js/et-pages/login.js'],
                layout: 'auth'
            })
        }
    }
    login(req, res) {
        let username = req.body.username
        let password = req.body.password

        User.findOne({
            where:{
                name: username,
            }
        }).then((userFound) => {
            if(userFound){
                console.log(password);
                console.log(userFound.password);
                console.log(bcrypt.compareSync(password, userFound.password));
                if(bcrypt.compareSync(password, userFound.password)){
                    
                    let userDetail = {
                        userId: userFound.id,
                        userName: userFound.name,
                        role: userFound.role
                    }
                    req.session.user = userDetail
                    res.send({ status: true, message: 'succeed', userDetail })
                }else{
                    res.send({ status: false, message: 'fail' })
                }                
            }else{
                res.send({ status: false, message: 'fail' })
            }

        })
    }
    logout(req, res) {
        req.session.destroy(() => {
            res.clearCookie('sessionId')
            res.send({status: true})
        });
    }
}
module.exports = new Authentication()
