import seqAndModel from "./index.js"


class Controller{
   
    async test(req, res){
        res.json({req_body: req.body, message: 'ok', req_headers: req.headers})
    }

    async create(req ,res){
        const News = seqAndModel.modl

        let created

        try {
            created = await News.create(req.body)
            res.json(created)
        } catch (error) {
            res.status(400).json({errorMessahe: 'данные указаны неверно'})
        }
    }

    async delete(req, res){
        const News = seqAndModel.modl

        let element 

        try {
            element = await News.findOne({where:{id: req.body.id}})
            element.destroy()
            res.status(204).json()
        } catch (error) {
            res.status(400).json({errorMessage:'удаление невозмжно'})
        }
    }

    async getAllInCenter(req, res){
        const News = seqAndModel.modl

        let result
        
        try {
            result = await News.findAll({where:{center_in: req.body.center_in}})
        } catch (error) {
            res.status(400).json(error)            
        }

        res.json(result)


    }

}

export default new Controller()