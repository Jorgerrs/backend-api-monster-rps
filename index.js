const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB conectado');
  } catch (error) {
    console.error('🔴 Error de conexión:', error.message);
    process.exit(1);
  }
};

const rarities = ['comun', 'poco comun', 'raro', 'epico', 'legendario','secreto'];

// Schema and model
const criaturaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rareza: { type: String, enum: rarities, required: true },
  unlocked: { type: Boolean, required: true },
  imagen: { type: String, required: true },
  ataques: { type: [String], validate: [arr => arr.length === 3, 'Deben ser tres ataques'] },
  descripcion: { type: String, required: true }
});

const Criatura = mongoose.model('Criatura', criaturaSchema);

// CRUD routes
app.get('/criaturas', async (req, res) => {
  const criaturas = await Criatura.find();
  res.json(criaturas);
});

app.post('/criaturas', async (req, res) => {
  try {
    const criatura = await Criatura.create(req.body);
    res.status(201).json(criatura);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/criaturas/:id', async (req, res) => {
  try {
    const criatura = await Criatura.findById(req.params.id);
    if (!criatura) return res.status(404).json({ error: 'No encontrada' });
    res.json(criatura);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/criaturas/:id', async (req, res) => {
  try {
    const criatura = await Criatura.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!criatura) return res.status(404).json({ error: 'No encontrada' });
    res.json(criatura);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/criaturas/:id', async (req, res) => {
  try {
    const criatura = await Criatura.findByIdAndDelete(req.params.id);
    if (!criatura) return res.status(404).json({ error: 'No encontrada' });
    res.json({ mensaje: 'Eliminada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀Servidor iniciado`);
  });
});
