export const TYPES = {
    ProductRepository: Symbol.for("ProductRepository"),
    MongoClient: Symbol.for("MongoClient")
};

// esto es para inyección de dependencias, se puede usar con inversify o cualquier otro contenedor de dependencias.