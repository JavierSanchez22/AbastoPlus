import { connectToDatabase, closeDatabaseConnection } from "./shared/infrastructure/mongodb-connection";
import { MongoProductRepository } from "./catalog/product/infrastructure/mongo-product-repository";
import { SaveProduct } from "./catalog/product/application/use-cases/save-product";
import { ProductID } from "./catalog/product/domain/value-objects/product-id";
import { PresentationID } from "./catalog/product/domain/entities/presentation/presentation-id";

async function main() {
    try {
        // 1. Inyección de la conexión a la Infraestructura
        const client = await connectToDatabase();
        
        // 2. Inyección del cliente al Repositorio
        const productRepository = new MongoProductRepository(client);
        
        // 3. Inyección del Repositorio al Caso de Uso
        const saveProductUseCase = new SaveProduct(productRepository);

        console.log('Iniciando proceso de guardado...');
        const productDataPayload = {
            id: ProductID.randomID().value, 
            name: 'Wiskas para Gato Adulto',
            baseUnit: 'kg',
            presentations: [
                {
                    id: PresentationID.randomID().value,
                    name: 'Bolsa grande 2kg',
                    type: 'bag',
                    netQuantity: 2,
                    unitOfMeasure: 'kg'
                }
            ]
        };

        await saveProductUseCase.execute(productDataPayload);

    } catch (error: any) {
        console.error('Ocurrió un error:', error.message);
    } finally {
        await closeDatabaseConnection();
    }
}

main();