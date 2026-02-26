// file: src/main.ts
import { connectToDatabase, closeDatabaseConnection } from "./shared/infrastructure/mongodb-connection";
import { MongoProductRepository } from "./catalog/product/infrastructure/mongo-product-repository";
import { SaveProduct } from "./catalog/product/application/use-cases/save-product";
import { ProductID } from "./catalog/product/domain/value-objects/product-id";
import { PresentationID } from "./catalog/product/domain/entities/presentation/presentation-id";

async function main() {
    try {
        // Conexion a la base de datos
        const client = await connectToDatabase();
        const productRepository = new MongoProductRepository(client);
        const saveProductUseCase = new SaveProduct(productRepository);

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
        // Cerramos conexion con la base de datos
        await closeDatabaseConnection();
    }
}

main();