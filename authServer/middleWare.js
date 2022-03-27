import axios from "axios";

class middle{

    async autorizeAdmin(req, res, next){
        await axios({
            url:'http://localhost:2000/auth/premissions',
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
                    res.status(400).json({errorMessage: 'недостаточно прав'})
                }
            }
        })
        .catch((error) =>{
            res.status(400).json({errorMessage: 'не авторизован'})
        })
    }

    async autorizeSuperuser(req, res, next){
        await axios({
            url:'http://localhost:2000/auth/premissions',
            method: 'get',
            headers:{
                'authorization': req.headers.authorization
            }
        })
        .then((response) =>{
            let roles = ['SUPERUSER']
            let myRole = response.data['role']

            if (response.status == 200){
                if(roles.indexOf(myRole) != -1){
                    next()
                }
                else{
                    res.status(400).json({errorMessage: 'недостаточно прав'})
                }
            }
        })
        .catch((error) =>{
            res.status(400).json({errorMessage: 'не авторизован'})
        })
    }

    async autorizeUser(req, res, next){
        await axios({
            url:'http://localhost:2000/auth/premissions',
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
                    res.status(400).json({errorMessage: 'недостаточно прав'})
                }
            }
        })
        .catch((error) =>{
            res.status(400).json({errorMessage: 'не авторизован'})
        })
    }


    async printLol(req, res){
        res.json('lol')
    }
}

export default new middle()