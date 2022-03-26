import keys from '../settings.js'
import jwt from 'jsonwebtoken'
import sequalizes from '../index.js'
import bcrypt from 'bcrypt'

const secretJWT = keys.secretKeyJWT
const saltRounds = keys.saltRounds

function generateAccessToken(payload){
    return jwt.sign(payload, secretJWT)
}


class authController{
    async test(req, res){
        res.json({body: req.body, message: 'ok!'})
    }

    async registration(req, res){

        const User = sequalizes.user
        let createdUser

        if(await User.findOne({where:{login: req.body.login}}) === null){
            
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            let roleUser = req.body.role ? req.body.role : 'USER'

            createdUser = await User.create({
                login: req.body.login,
                password: hashedPassword,
                role: roleUser
            })
            res.json({id: createdUser.id, login: createdUser.login})
        }
        else{
            res.status(400).json({errorMessage: 'пользователь с таким именем уже существует'})
        }
    }

    async login(req, res){

        const User = sequalizes.user

        let findUser = await User.findOne({where:{login: req.body.login}})

        if(findUser === null){
            res.status(400).json({errorMessage: 'пользователья с таким именем не существует'})
        }
        else{
            if(bcrypt.compareSync(req.body.password, findUser.password)){
                res.json({token: generateAccessToken({login: findUser.login, role: findUser.role})})
            }
            else{
                res.status(400).json({errorMessage: 'неверный пароль'})
            }
        }

    }

    async getRole(req, res){
        let token = req.headers.authorization.split(' ')[1]
        res.json(jwt.decode(token))
    }
}

export default new authController()