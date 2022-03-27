import seqAndModel from './index.js'

async function getOne(req, res, next){
    const Center = seqAndModel.modl

    let result

    try {
        result = await Center.findOne({where:{name: req.query.name}})

        if(result == null){
            res.status(400).json({errorMessage:'не найден центр с таким именем'})
        }
        else{
            next()
        }
    } catch (error) {
        res.status(400).json({errorMessage: error})
    }
}

export default getOne