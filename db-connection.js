const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

module.exports = db;

// Fonction pour vider une collection spécifique
// async function clearCollection(collectionName) {
//   try {
//     await mongoose.connection.collection(collectionName).deleteMany({});
//     console.log(`Collection ${collectionName} cleared`);
//   } catch (error) {
//     console.error(`Failed to clear collection ${collectionName}:`, error);
//   }
// }

// clearCollection("books");
