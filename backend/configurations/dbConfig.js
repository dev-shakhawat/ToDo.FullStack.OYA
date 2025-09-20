
const mongoose = require('mongoose');
 

async function dbConfigaration() {
  const connection =  await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.mn2y2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);

  console.log(`Database connected to ${connection.connection.host}`);
 
}


module.exports = dbConfigaration