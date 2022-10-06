const mongoose = require('mongoose')

let mongodb_uri = "mongodb://localhost:27017/expenseTrackerDB"; 

if(process.env.NODE_ENV == "production") {
    mongodb_uri = process.env.MONGO_URI;
}

const connectDB = async () => {
    try {
        const client = await mongoose.connect(mongodb_uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

        console.log(`MongoDB connected to database ${client.connection.name}...`)
    } catch (error) {
        console.log('MONGO_DB_CONNECTION_ERROR:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB;