import seqAndModel from "./index.js"


class Controller{
    async test(req, res){
        res.json({req_body: req.body, message: 'ok', req_headers: req.headers})
    }

    async create(req ,res){
        const Schedule = seqAndModel.modl

        let created

        try {
            created = await Schedule.create(req.body)
            res.json(created)
        } catch (error) {
            res.status(400).json({errorMessahe: 'данные указаны неверно'})
        }
    }

    async delete(req, res){
        const Schedule = seqAndModel.modl

        let element 

        try {
            element = await Schedule.findOne({where:{id: req.body.id}})
            element.destroy()
            res.status(204).json()
        } catch (error) {
            res.status(400).json({errorMessage:'удаление невозмжно'})
        }
    }

    async getAllInCenter(req, res){
        const Schedule = seqAndModel.modl

        let result
        
        try {
            result = await Schedule.findAll({where:{center_in: req.body.center_in}})
        } catch (error) {
            res.status(400).json(error)            
        }

        res.json(result)


    }

    async getOne(req, res){
        const Schedule = seqAndModel.modl

        let result
        
        try {
            result = await Schedule.findOne({where:{id: req.params.id}})
        } catch (error) {
            res.status(400).json(error)            
        }

        res.json(result)
    }

}

export default new Controller()