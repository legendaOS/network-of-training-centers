import axios from "axios"

class Controller{

    disableCORS(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.setHeader('Access-Control-Allow-Credentials', true);

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

}   

export default new Controller()