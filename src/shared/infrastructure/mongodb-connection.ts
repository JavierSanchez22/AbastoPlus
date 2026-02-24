import { MongoClient} from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

export async function connectToDatabase(): Promise<MongoClient> {
    try {
        await client.connect();
        console.log('Conexión exitosa a MongoDB.');
        return client
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        throw error;
    }
}

export async function closeDatabaseConnection(): Promise<void> {
    await client.close();
    console.log('Conexión a MongoDB cerrada.');
}