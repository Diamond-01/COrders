const pool = require('../db'); // Importamos la conexión real

const save = async (newOrder) => {
    const query = `
        INSERT INTO orders (id, title, fields, created_at) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;
    const values = [
        newOrder.id, 
        newOrder.title, 
        JSON.stringify(newOrder.fields), // Convertimos el array a JSON para guardarlo
        newOrder.createdAt
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const findAll = async () => {
    const query = 'SELECT * FROM orders ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
};

const findById = async (id) => {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = { save, findAll, findById };