import seqAndModel from "./index.js"

class Controller{


    async test(req, res){

        res.set({
            "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "haha":"Hehe"
        }).json({req_headres: req.headers, req_body: req.body, messge :'ok2'})

    }

    async createCenter(req ,res){
        const Center = seqAndModel.modl

        let created

        try {
            created = await Center.create(req.body)

        } catch (error) {
            res.status(400).json({errorMessage: 'центр с таким именем уже существует'})
        }
         

        res.json(created)
    }

    async getAll(req, res){
        const Center = seqAndModel.modl

        let result
        
        try {
            result = await Center.findAll()
        } catch (error) {
            res.status(400).json(error)            
        }

        res.json(result)


    }

    async getOne(req, res, next){
        const Center = seqAndModel.modl

        let result

        try {
            result = await Center.findOne({where:{name: req.query.name}})

            if(result == null){
                res.status(400).json({errorMessage:'не найден центр с таким именем'})
            }
            else{
                res.json(result)
            }
        } catch (error) {
            res.status(400).json({errorMessage: error})
        }
    }

    async changeCenter(req, res){
        const Center = seqAndModel.modl

        let result 

        try {
            result = await Center.findOne({where:{name: req.body.name}})
        } catch (error) {
            res.status(400).json({errorMessage: 'центр с таким именем не найден'})
        }

        result.set(req.body)

        try {
            await result.save()
            res.json(result)
        } catch (error) {
            res.status(400).json({errorMessage: 'невозможно обновить данные'})
        }
        
    }

    async deleteCenter(req, res){
        const Center = seqAndModel.modl

        let result 

        try {
            result = await Center.findOne({where:{name: req.body.name}})
        } catch (error) {
            res.status(400).json({errorMessage: 'центр с таким именем не найден'})
        }

        try {
            await result.destroy()
            res.json(result)
        } catch (error) {
            res.status(400).json({errorMessage: 'невозможно удалить'})
        }
    }
}

export default new Controller()