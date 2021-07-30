const express = require("express");
const app = express();

//GET
app.get("/", (req, res) => {
    console.log("peticion en el /");
    res.json({
        ok: true,
        msgf: "felicidades",
    });
});

//Routes
app.use("/api/auth", require("./routes/auth.js"));

app.listen(4000, () => {
    console.log(` Servidor corriendo en puerto ${4000}`);
});