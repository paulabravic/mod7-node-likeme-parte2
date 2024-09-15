const { leerPost, escribirPost, modificarPost, eliminarPost} = require("./funciones");
const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get("/posts", async (req, res) => {
    try {
        const obtenerPost = await leerPost();
        res.json(obtenerPost);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error: " + error.message });
    }
});

app.post("/posts",async(req, res) => {
    const {titulo, img, descripcion, likes} = req.body;
    try {
        const postNuevo = await escribirPost(titulo, img, descripcion, likes)
        res.send(postNuevo);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error: " + error.message });
    }
});

app.put("/posts/like/:id",async(req, res) => {
    const {id} = req.params;
    try {
        await modificarPost(id);
        res.send("El post fue modificado");
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error: " + error.message });
    }
});

app.delete("/posts/:id",async(req, res) => {
    const id = req.params.id;
    try {
        await eliminarPost(id);
        res.send("El post fue eliminado");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ha ocurrido un error: " + error.message });
    }
});

app.listen(port, () => console.log("servidor escuchado en puerto 3000")); 