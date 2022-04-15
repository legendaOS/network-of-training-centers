import axios from "axios"

class Controller{

    disableCORS(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.setHeader('Access-Control-Allow-Credentials', true);

        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next()
    }

    async getAllCenters(req, res){
        
        axios.get('http://centers_server/')
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).send(error)
        })


    }

    async test(req, res){
        res.json(req.body)
    }

    async testget(req, res){
        res.json(req.query)
    }

    async data(req ,res){
        let buffer = {news: []}

        await axios({
            method: 'post',
            url: 'http://news_server/',
            data: {
                "center_in":req.query.center_in
            }
        })
        .then(function (response) {

            buffer.news = response.data
            
        })
        .catch(function (error) {
            res.status(400).send(error)
        })

        await axios({
            method: 'post',
            url: 'http://schedules_server/',
            data: {
                "center_in":req.query.center_in
            }
        })
        .then(function (response) {

            buffer.schedules = response.data
            
        })
        .catch(function (error) {
            res.status(400).send(error)
        })


        res.json(buffer)

    }

    async login(req, res){

        axios({
            method: 'post',
            url: 'http://auth_server/auth/login',
            data: {
              login: req.body.login,
              password: req.body.password 
            }
        })
        .then(function (responsetok) {

            const token = `Bearer ${responsetok.data.token}`

            axios.get('http://auth_server/auth/premissions', {
                headers: {
                    'Authorization': token
                }
            })
            .then(function (response) {

                res.json({...response.data, token: token})
                
            })
            .catch(function (error) {
                res.status(400).send(error)
            })

            
        })
        .catch(function (error) {
            res.status(400).send(error)
        })

    }

    async reg(req ,res){

        
        axios({
            method: 'post',
            url: 'http://auth_server/auth/registration',
            data: {
                login: req.body.login,
                password: req.body.password,
                fio: req.body.fio
            }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json()
        })
    }

    async autorizeAdmin(req, res, next){
        await axios({
            url:'http://auth_server/auth/premissions',
            method: 'get',
            headers:{
                'authorization': req.headers.authorization
            }
        })
        .then((response) =>{
            let roles = ['SUPERUSER', 'ADMIN']
            let myRole = response.data['role']

            if (response.status == 200){
                if(roles.indexOf(myRole) != -1){
                    next()
                }
                else{
                    res.status(406).json({errorMessage: 'недостаточно прав'})
                }
            }
        })
        .catch((error) =>{
            res.status(407).json({errorMessage: 'не авторизован'})
        })
    }

    async autorizeUser(req, res, next){
        await axios({
            url:'http://auth_server/auth/premissions',
            method: 'get',
            headers:{
                'authorization': req.headers.authorization
            }
        })
        .then((response) =>{
            let roles = ['SUPERUSER', 'ADMIN', 'USER']
            let myRole = response.data['role']

            if (response.status == 200){
                if(roles.indexOf(myRole) != -1){
                    next()
                }
                else{
                    res.status(406).json({errorMessage: 'недостаточно прав'})
                }
            }
        })
        .catch((error) =>{
            res.status(407).json({errorMessage: 'не авторизован'})
        })
    }

    async deleteNews(req, res){

        axios.delete('http://news_server/delete', {
            headers: {
              Authorization: req.headers.authorization
            },
            data: {
              id: req.body.id
            }
          })
          .then(function (response) {

            res.json()
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async addNews(req, res){
        axios({
            method: 'post',
            url: 'http://news_server/create',
            data: req.body,
            headers: {
                Authorization: req.headers.authorization
              }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async deleteShedlues(req, res){

        axios.delete('http://schedules_server/delete', {
            headers: {
              Authorization: req.headers.authorization
            },
            data: {
              id: req.body.id
            }
          })
          .then(function (response) {

            res.json()
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async addShedlues(req, res){
        axios({
            method: 'post',
            url: 'http://schedules_server/create',
            data: req.body,
            headers: {
                Authorization: req.headers.authorization
              }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async addCenter(req, res){
        axios({
            method: 'post',
            url: 'http://centers_server/create',
            data: req.body,
            headers: {
                Authorization: req.headers.authorization
              }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async deleteCenter(req, res){
        axios.delete('http://centers_server/center', {
            headers: {
              Authorization: req.headers.authorization
            },
            data: req.body
          })
          .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async changeCenter(req, res){
        axios({
            method: 'put',
            url: 'http://centers_server/change',
            data: req.body,
            headers: {
                Authorization: req.headers.authorization
              }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async createApplication(req, res){

        let fio_user 

        await axios({
            method: 'get',
            url: 'http://auth_server/auth/premissions',
            headers: {
                Authorization: req.headers.authorization
              }
        })
        .then(function (response) {

            fio_user = response.data.fio
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })

        await axios({
            method: 'post',
            url: 'http://applications_server/create',
            data: {
                id_schedules: req.body.id_schedules,
                user_name: fio_user
            },
            headers: {
                Authorization: req.headers.authorization
            }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })


        
    }

    async getApplications(req, res){

        let uri = encodeURI(`http://applications_server/applications`)

        let applications

        let result = []


        await axios({
            method: 'get',
            url: uri,
            headers: {
                Authorization: req.headers.authorization
              }
        })
        .then(function (response) {

            applications = response.data
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })

        for(let elm of applications){
            await axios.get(encodeURI(`http://schedules_server/${elm.id_schedules}`))
            .then(function (re) {
                let r = re.data
                result.push({id: elm.id, date: r.date, time: r.time, center_in: r.center_in, topic:r.topic, fio: elm.user_name})
            })
            .catch(function(){})
        }

        res.json(result)
        
        
    }

    async deleteApplication(req, res){
        await axios({
            method: 'delete',
            url: 'http://applications_server/application',
            data: {
                id: req.body.id
            },
            headers: {
                Authorization: req.headers.authorization
            }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async getAllUsers(req, res){
        await axios.get(encodeURI(`http://auth_server/auth/users`),{
            headers:{
                authorization: req.headers.authorization
            }
        })
        .then(function (re) {
            res.json(re.data)
        })
        .catch(function(er){
            res.status(410).json(er)
        })

    }

    async changeUser(req, res){
        await axios({
            method: 'patch',
            url: 'http://auth_server/auth/user',
            data: {
                id: req.body.id,
                role: req.body.role
            },
            headers: {
                Authorization: req.headers.authorization
            }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

    async deleteUser(req, res){
        await axios({
            method: 'delete',
            url: 'http://auth_server/auth/user',
            data: {
                id: req.body.id
            },
            headers: {
                Authorization: req.headers.authorization
            }
        })
        .then(function (response) {

            res.json(response.data)
            
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
    }

}   

export default new Controller()