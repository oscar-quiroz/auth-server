const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config.js");
require("dotenv").config();

const app = express();

//conexion bases de datos
dbConnection();

app.use(express.static("public"));

//CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth.js"));

//manejar todas las posibles rutas
/**
 * app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
});
 */


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});