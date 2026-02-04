const express = require('express');
const cors = require('cors');
require('dotenv').config();


const ordersRoutes = require('./routes/orders.routes');
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
// CORS: Permite que el Frontend (puerto 5173) hable con este Backend (puerto 3000)
app.use(cors()); 

// JSON: Importante. Permite que tu API entienda los datos que llegan en formato JSON
app.use(express.json());

app.use('/api/orders', ordersRoutes);
// --- Ruta de prueba inicial ---
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'API Order Builder funcionando correctamente 🚀',
    timestamp: new Date()
  });
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`\n--- Servidor BACKEND corriendo ---`);
  console.log(`> URL local: http://localhost:${PORT}`);
  console.log(`> Esperando peticiones...\n`);
});
