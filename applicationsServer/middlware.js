import axios from 'axios'

class middleWare{

    async checkCenter(req, res, next){r
        await axios({
            url:'http://localhost:3000/find',
            method: 'get',
            params:{
                name: req.body.center_in
            }
        })
        .then((response) =>{
            next()
        })
        .catch((error) =>{
            res.status(400).json({errorMessage: 'такого центра не существует'})
        })
    }


}



export default new middleWare()