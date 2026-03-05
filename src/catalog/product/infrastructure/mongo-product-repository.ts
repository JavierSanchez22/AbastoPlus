import { ProductRepository } from "../application/product-repository";
import { Product } from "../domain/product";
import { MongoClient, Collection } from "mongodb";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../types";


@injectable() // Esto es para que se pueda inyectar esta clase con inversify
export class MongoProductRepository implements ProductRepository {
    private readonly collection: Collection;

    constructor(@inject(TYPES.MongoClient) client: MongoClient) { // Inyectamos el cliente de MongoDB usando inversify
        const db = client.db('AbastoPlusDB');
        this.collection = db.collection('products');
    }

    async save(data: Product): Promise<void> {
        const presentationsToSave = data.presentations.map(p => ({
            id: p.id.value,
            name: p.name.value,
            type: p.type.value,
            netQuantity: p.netQuantity.value,
            unitOfMeasure: p.unitOfMeasure.value
        }));

        const productDocument = {
            id: data.getProductId().value, 
            name: data.getProductName().value,
            baseUnit: data.getProductBaseUnit().value,
            presentations: presentationsToSave
        };

        await this.collection.updateOne(
            { id: productDocument.id },
            { $set: productDocument },
            { upsert: true }
        );
        
        console.log(`Producto Guardado con exito: ${productDocument.name}`);
    }
}