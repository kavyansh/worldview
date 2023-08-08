import { Client, Databases } from "appwrite";
import { v4 as uuid } from "uuid";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64bea8f135a5711c590f"); // Your project ID

const databases = new Databases(client);
