import seqAndModel from "./index.js"


class Controller{
   
    async test(req, res){
        res.json('ok')
    }

    async create(req, res){
        const Application = seqAndModel.modl

        let created

        try {
            created = await Application.create(req.body)
            res.json(created)

        } catch (error) {
            res.status(400).json()
        }
    }

    async getByName(req, res){
        const Application = seqAndModel.modl

        let result

        try {
            result = await Application.findAll({where:{user_name: req.params.name}})

            res.json(result)
        } catch (error) {
            res.status(400).json({errorMessage: error})
        }
    }

    async deleteAppl(req, res){
        const Application = seqAndModel.modl

        let result

        try {
            result = await Application.findOne({where:{id: req.body.id}})

            await result.destroy()

            res.json(result)
        } catch (error) {
            res.status(400).json({errorMessage: 'удалить не вышло'})
        }
    }
    

   
        

}

export default new Controller()