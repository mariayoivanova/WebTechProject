/*const mongoose = require('mongoose');

const connectDB =async () => {
    try{
mongoose.set('strictQuery',false);
const conn = await mongoose.connect(process.env.MONGODB_URI);
console.log('Database Connected: ${conn.connection.host}');
}catch(error){

    console.log(error);

    }
}

module.exports = connectDB;*/

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Beende den Prozess mit einem Fehlercode
  }
};

module.exports = connectDB;
