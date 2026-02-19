import { Product } from "./catalog/product/domain/product";
import { ProductID } from './catalog/product/domain/value-objects/product-id';

function main() {
    try {
        console.log('Creando producto...');
        
        const producto = Product.build(
            ProductID.randomID().value,
            'Producto de prueba',
            'kg'                 
        );
        
        console.log('Producto creado con éxito:', producto);
        
    } catch (error: any) {
        console.error('Error al crear el producto:', error.message);
    }
}

main();