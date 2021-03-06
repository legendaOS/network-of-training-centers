import axios from 'axios'


async function checkCenter(req, res, next){
    let r
    await axios({
        url:'http://centers_server/find',
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

export default checkCenter