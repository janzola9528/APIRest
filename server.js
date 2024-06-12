const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://mongo:dSRUoaZNnsdpUAHNcYBcwkpUHpLROsVy@roundhouse.proxy.rlwy.net:57853', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definición del esquema de la colección "prueba"
const pruebaSchema = new mongoose.Schema({
  campo1: String,
  campo2: Number,
  // Puedes agregar más campos según sea necesario
});

// Definición del modelo "Prueba"
const Prueba = mongoose.model('Prueba', pruebaSchema);

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Endpoint para obtener todos los documentos en la colección "prueba"
app.get('/prueba', async (req, res) => {
  try {
    const data = await Prueba.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para crear un nuevo documento en la colección "prueba"
app.post('/prueba', async (req, res) => {
  const prueba = new Prueba({
    campo1: req.body.campo1,
    campo2: req.body.campo2,
    // Puedes agregar más campos según sea necesario
  });

  try {
    const newPrueba = await prueba.save();
    res.status(201).json(newPrueba);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para actualizar un documento en la colección "prueba" por su ID
app.put('/prueba/:id', async (req, res) => {
  try {
    const updatedPrueba = await Prueba.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPrueba);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para eliminar un documento en la colección "prueba" por su ID
app.delete('/prueba/:id', async (req, res) => {
  try {
    await Prueba.findByIdAndDelete(req.params.id);
    res.json({ message: 'Documento eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
