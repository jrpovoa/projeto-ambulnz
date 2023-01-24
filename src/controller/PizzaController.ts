import { Request, Response } from "express";
import { PizzaBusiness } from "../business/PizzaBusiness";

export class PizzaController{
    constructor(
        private PizzaBusiness: PizzaBusiness
    ) {}

    public getPizzas = async (req: Request, res: Response) => {
        try {
            const response = await this.PizzaBusiness.getPizzas()
            res.status(200).send(response)
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).send({message: error.message})
        }
    }
}