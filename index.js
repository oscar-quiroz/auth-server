const express = require("express");
const cors = require('cors');
require('dotenv').config();


const app = express();

//CORS
app.use(cors())

//lectura y parseo del body
app.use(express.json())

//Routes
app.use("/api/auth", require("./routes/auth.js"));

app.use(express.static('public'))



app.listen(process.env.PORT, () => {
    console.log(` Servidor corriendo en puerto ${process.env.PORT}`);
});