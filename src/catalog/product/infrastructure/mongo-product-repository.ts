import { ProductRepository } from "../application/product-repository";
import { Product } from "../domain/product";
import { MongoClient, Collection } from "mongodb";



export class MongoProductRepository implements ProductRepository {
    private readonly collection: Collection;
    constructor(client: MongoClient) {
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