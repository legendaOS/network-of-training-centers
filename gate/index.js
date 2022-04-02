import Express  from "express";
import router from "./Router.js";

const app = Express()

app.use(Express.json())

app.use('/', router)

app.listen(80, ()=>{
    console.log('Gateway ready')
})