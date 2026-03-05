// file: src/main.ts
import "reflect-metadata"; // IMPORTANTE: Debe ir en la primera línea
import { container } from "./inversify.config";
import { TYPES } from "./types";
import { connectToDatabase, closeDatabaseConnection } from "./shared/infrastructure/mongodb-connection";
import { SaveProduct } from "./catalog/product/application/use-cases/save-product";
import { ProductID } from "./catalog/product/domain/value-objects/product-id";
import { PresentationID } from "./catalog/product/domain/entities/presentation/presentation-id";
import { MongoClient } from "mongodb";

async function main() {
    try {
        // 1. Conexion a la base de datos
        const client = await connectToDatabase();
        
        // 2. Registramos el cliente de MongoDB en el contenedor de Inversify para que pueda ser inyectado en cualquier clase que lo necesite.
        container.bind<MongoClient>(TYPES.MongoClient).toConstantValue(client);

        // 3. Obtenemos una instancia del caso de uso SaveProduct desde el contenedor de Inversify, lo que automáticamente inyectará las dependencias necesarias (como el repositorio de productos).
        const saveProductUseCase = container.get<SaveProduct>(SaveProduct);

        console.log('Producto...');
        const productDataPayload = {
            id: ProductID.randomID().value, 
            name: 'Wiskas para Gato',
            baseUnit: 'kg',
            presentations: [
                {
                    id: PresentationID.randomID().value,
                    name: 'Bolsa grande 500g',
                    type: 'box',
                    netQuantity: 2,
                    unitOfMeasure: 'kg'
                }
            ]
        };

        console.log('Guardardando Producto...');
        await saveProductUseCase.execute(productDataPayload);

    } catch (error: any) {
        console.error('Ocurrió un error:', error.message);
    } finally {
        await closeDatabaseConnection();
    }
}

main();