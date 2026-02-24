import { connectToDatabase, closeDatabaseConnection } from "./shared/infrastructure/mongodb-connection";
import { MongoProductRepository } from "./catalog/product/infrastructure/mongo-product-repository";
import { Product } from "./catalog/product/domain/product";
import { ProductID } from "./catalog/product/domain/value-objects/product-id";
import { PresentationID } from "./catalog/product/domain/entities/presentation/presentation-id";

async function main() {
    try {
        const client = await connectToDatabase();
        const productRepository = new MongoProductRepository(client);

        console.log('Creando Producto');
        const producto = Product.build(
            ProductID.randomID().value,
            'Wiskas para gato', 
            'kg',
            [
                {
                    id: PresentationID.randomID().value,
                    name: 'Bolsa de 1 Kilo',
                    type: 'bag',
                    netQuantity: 1,
                    unitOfMeasure: 'kg'
                }
            ]
        );

        console.log('Guardando producto...');
        await productRepository.save(producto);
        console.log('Producto guardado con exito');

    } catch (error: any) {
        console.error('Ocurrió un error:', error.message);
    } finally {
        await closeDatabaseConnection();
    }
}

main();