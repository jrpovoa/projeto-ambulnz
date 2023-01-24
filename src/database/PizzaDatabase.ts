import { IPizzaDB, IPizzaIngredientsDB, Pizza } from "../models/Pizza"
import { BaseDatabase } from "./BaseDatabase"

export class PizzaDatabase extends BaseDatabase {
    public static TABLE_PIZZA = "ambulnz_pizza"
    public static TABLE_INGREDIENTS = "ambulnz_ingredients"
    public static TABLE_PIZZA_INGREDIENTS = "ambulnz_pizza_ingredients"

    public toPizzaDBModel = (pizza: Pizza): IPizzaDB => {
        return {
            name: pizza.getName(),
            price: pizza.getPrice()
        }
    }

    public getPizzas = async (): Promise<IPizzaDB[]> => {
        const result: IPizzaDB[] = await BaseDatabase.connection(PizzaDatabase.TABLE_PIZZA).select()
        return result
    }

    public getIngredients = async (pizzaName: string): Promise<string[]> => {
        const result: IPizzaIngredientsDB[] = await BaseDatabase.connection(PizzaDatabase.TABLE_PIZZA_INGREDIENTS).select().where({ pizza_name: pizzaName})
        return result.map(item => item.ingredient_name)
    }
}