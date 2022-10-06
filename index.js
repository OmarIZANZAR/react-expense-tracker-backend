const cors = require('cors');
const path = require('path');
const express = require('express');
const transactionsRouter = require('./routes')
const connectDB = require('./config/db');

// Connecting to database
connectDB()

// Setting the server
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting the transactions router:
app.use('/api/v1/transactions', transactionsRouter)

// Base response
// app.get('/', (req, res) => {
//     if( process.env.NODE_ENV == "production" ){
//         res.redirect(process.env.CLIENT_URL)
//     } else {
//         res.redirect('http://localhost:3000')
//     }
// })


app.use(express.static('./client'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','index.html')
)})


// Running the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`))