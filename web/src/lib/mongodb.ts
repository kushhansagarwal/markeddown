import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let clientPromise: Promise<MongoClient>;

const uri = "mongodb+srv://markeddown:6i0w9fFQqDHrEYsR@markeddown-atlas.vzwdz85.mongodb.net/?retryWrites=true&w=majority&appName=MarkedDown-Atlas";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
};

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
