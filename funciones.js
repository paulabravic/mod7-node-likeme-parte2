const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "likeme",
    allowExitOnIdle: true,
});

const leerPost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY id;");
    return rows;
}

const escribirPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1,$2,$3,$4) RETURNING *";
    const values = [titulo, img, descripcion, likes];
    const res = await pool.query(consulta, values);
    console.log("Post agregado: " + res.rows[0]);
    return res.rows[0];
}

const modificarPost = async (id) => {
    const consulta = "UPDATE posts SET likes = (COALESCE(likes, 0) + 1) WHERE id = $1";
    const values = [id];
    await pool.query(consulta, values);
    console.log("Post modificado");
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    await pool.query(consulta, values);
    console.log("Post eliminado");
}

module.exports = { leerPost, escribirPost, modificarPost, eliminarPost };
