import { Container } from "inversify";
import { TYPES } from "./types";
import { ProductRepository } from "./catalog/product/application/product-repository";
import { MongoProductRepository } from "./catalog/product/infrastructure/mongo-product-repository";
import { SaveProduct } from "./catalog/product/application/use-cases/save-product";

const container = new Container();

// Declaramos el repositorio de productos, indicando que cuando se solicite una instancia de ProductRepository, se debe proporcionar una instancia de MongoProductRepository.
container.bind<ProductRepository>(TYPES.ProductRepository).to(MongoProductRepository);

// Declaramos el caso de uso SaveProduct, indicando que se debe proporcionar una instancia de SaveProduct cuando se solicite.
container.bind<SaveProduct>(SaveProduct).toSelf();

export { container };