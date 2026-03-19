export const TYPES = {
    ProductRepository: Symbol.for("ProductRepository"),
    MongoClient: Symbol.for("MongoClient"),
    TranslatorService: Symbol.for("TranslatorService"),
    EventBus: Symbol.for("EventBus")
};

// esto es para inyección de dependencias, se puede usar con inversify o cualquier otro contenedor de dependencias.