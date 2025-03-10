import { Router } from "express";

const helloRouter = Router()


helloRouter.get("/", (req, res) => {
    res.status(200).json({success: true, data: "Hello World!"})
})

export default helloRouter