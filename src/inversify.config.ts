import { Container } from "inversify";
import { TYPES } from "./types";
import { ProductRepository } from "./catalog/product/application/product-repository";
import { MongoProductRepository } from "./catalog/product/infrastructure/mongo-product-repository";
import { SaveProduct } from "./catalog/product/application/use-cases/save-product";
import { ApiTranslatorService } from "./catalog/product/infrastructure/mymemory-translate";
import { EventBus } from "./shared/domain/events/event-bus";
import { InMemoryEventBus } from "./shared/infrastructure/events/in-memory-event-bus";
import { TranslateProductSubscriber } from "./catalog/product/application/suscribers/translater-product-suscriber";

const container = new Container();

container.bind<EventBus>(TYPES.EventBus).to(InMemoryEventBus).inSingletonScope();
// Declaramos el repositorio de productos, indicando que cuando se solicite una instancia de ProductRepository, se debe proporcionar una instancia de MongoProductRepository.
container.bind<ProductRepository>(TYPES.ProductRepository).to(MongoProductRepository);

container.bind<TranslateProductSubscriber>(TranslateProductSubscriber).toSelf();
// Obtenemos la instancia del bus de eventos
const bus = container.get<EventBus>(TYPES.EventBus);
const translatorSubscriber = container.get<TranslateProductSubscriber>(TranslateProductSubscriber);

// Declaramos el caso de uso SaveProduct, indicando que se debe proporcionar una instancia de SaveProduct cuando se solicite.
container.bind<SaveProduct>(SaveProduct).toSelf();

// El servicio de traduccion
container.bind(TYPES.TranslatorService).to(ApiTranslatorService);

// Si tenemos suscriptores, los agregamos al bus de eventos
bus.addSubscribers("catalog.product_created", [translatorSubscriber]);

export { container };