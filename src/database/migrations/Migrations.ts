import { BaseDatabase } from "../BaseDatabase";
import { OrderDatabase } from "../OrderDatabase";
import { PizzaDatabase } from "../PizzaDatabase";

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDER_ITEM};
        DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDER};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZA_INGREDIENTS};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_INGREDIENTS};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZA};

        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZA} (
            name VARCHAR(255) PRIMARY KEY,
            price DECIMAL(3,2) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_INGREDIENTS} (
            name VARCHAR(255) PRIMARY KEY
        );
        
        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZA_INGREDIENTS} (
            pizza_name VARCHAR(255) NOT NULL,
            ingredient_name VARCHAR(255) NOT NULL,
            FOREIGN KEY (pizza_name) REFERENCES ambulnz_pizza(name),
            FOREIGN KEY (ingredient_name) REFERENCES ambulnz_ingredients(name)
        );
        
        CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDER} (
            id VARCHAR(255) PRIMARY KEY
        );
        
        CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDER_ITEM} (
            id VARCHAR(255) PRIMARY KEY,
            pizza_name VARCHAR(255) NOT NULL,
            quantity SMALLINT NOT NULL,
            order_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (pizza_name) REFERENCES ambulnz_pizza (name),
            FOREIGN KEY (order_id) REFERENCES ambulnz_order (id)
        );
        `)
    }

    insertData = async () => {
        // await BaseDatabase
        //     .connection(UserDatabase.TABLE_USERS)
        //     .insert(users)
    }
}

const migrations = new Migrations()
migrations.execute()