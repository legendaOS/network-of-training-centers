import keys from '../settings.js'
import jwt from 'jsonwebtoken'
import sequalizes from '../index.js'
import bcrypt from 'bcrypt'

const secretJWT = keys.secretKeyJWT
const saltRounds = keys.saltRounds

function generateAccessToken(payload){
    return jwt.sign(payload, secretJWT, { expiresIn: '1h' })
}


class authController{
    async test(req, res){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.json({req_headres: req.headers, req_body: req.body, messge :'ok2'})
    }

    async registration(req, res){

        const User = sequalizes.user
        let createdUser

        if(await User.findOne({where:{login: req.body.login}}) === null){
            
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            //let roleUser = req.body.role ? req.body.role : 'USER'

            createdUser = await User.create({
                login: req.body.login,
                password: hashedPassword,
                fio: req.body.fio
                //role: roleUser
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
                res.json({token: generateAccessToken({login: findUser.login, role: findUser.role, fio: findUser.fio, id: findUser.id})})
            }
            else{
                res.status(400).json({errorMessage: 'неверный пароль'})
            }
        }

    }

    async getPremissions(req, res){
        let token = req.headers.authorization.split(' ')[1]
        let decoded
        try {
            decoded = jwt.verify(token, secretJWT)
        } catch (error) {
            decoded = {errorMessage: 'не авторизован'}
            res.status(400).json(decoded)
        }
        res.json(decoded)
        
    }

    async findUser(req, res){
        const User = sequalizes.user

        let findUser

        try {
            findUser = await User.findOne({where:{login: req.query.login}})
            res.json({id:findUser.id})
        } catch (error) {
            res.status(400).json({errorMessage: 'такого пользователя не существует'})
        }
  
    }

    async changeUser(req, res){

        const User = sequalizes.user

        let usr

        try {
            usr = await User.findOne({where:{id: req.body.id}})

        } catch (error) {
            res.status(400).json({errorMessage: 'такого пользователя не существует'})
        }

        try {
            usr.role = req.body.role
            await usr.save()
            
            res.json(usr)

        } catch (error) {
            res.status(400).json({errorMessage: 'такого пользователя не существует'})
        }

    }

    async findAll(req, res){
        const User = sequalizes.user

        try {
            let findUser = await User.findAll()
            res.json(findUser)
        } catch (error) {
            res.status(400).json({errorMessage: 'что то пошло не так'})
        }
    }

    async deleteUser(req ,res){
        const User = sequalizes.user

        let usr

        try {
            usr = await User.findOne({where:{id: req.body.id}})

            await usr.destroy()

            res.status(204).json()

        } catch (error) {
            res.status(400).json({errorMessage: 'такого пользователя не существует'})
        }
    }
}

export default new authController()