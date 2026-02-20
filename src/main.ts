import { PresentationID } from "./catalog/product/domain/entities/presentation/presentation-id";
import { Product } from "./catalog/product/domain/product";
import { ProductID } from './catalog/product/domain/value-objects/product-id';

function main() {
    try {
        console.log('Creando producto...');
        
        const producto = Product.build(
            ProductID.randomID().value,
            'Producto de prueba',
            'kg',
            [{id: PresentationID.randomID().value, name: 'Bolsa de 1 Kilo', type: 'bag', netQuantity: 1, unitOfMeasure: 'kg'}]    
        );
        
        console.log('Producto creado con éxito:', producto, producto.presentations);
        
    } catch (error: any) {
        console.error('Error al crear el producto:', error.message);
    }
}

main();