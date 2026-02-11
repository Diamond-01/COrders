const pool = require('../config/db');

const save = async (orderData) => {
    const query = `
        INSERT INTO orders (id, title, description, schema, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
    `;

    const values = [
        orderData.id,
        orderData.title,
        orderData.description,
        JSON.stringify(orderData.schema),
        orderData.createdAt,
        orderData.createdAt
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