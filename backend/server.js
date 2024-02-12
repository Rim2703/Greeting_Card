const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const path = require('path')

if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: 'http://localhost:5173/',
        credentials: true
    }))
}
else {
    app.use(cors({
        credentials: true
    }))
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../backend/frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../backend/frontend/dist", "index.html"));
    });
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
})
    .then(() => console.log("Mongodb is Connected"))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () =>
    console.log(`Server is running on ${PORT}`)
);