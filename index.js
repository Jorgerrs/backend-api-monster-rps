const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/criaturas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rarities = ['comun', 'poco comun', 'raro', 'epico', 'legendario'];

// Schema and model
const criaturaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rareza: { type: String, enum: rarities, required: true },
  ataques: { type: [String], validate: [arr => arr.length === 3, 'Deben ser tres ataques'] }
});

const Criatura = mongoose.model('Criatura', criaturaSchema);

// CRUD routes
app.get('/criaturas', async (req, res) => {
  const criaturas = await Criatura.find();
  res.json(criaturas);
});

app.post('/criaturas', async (req, res) => {
  try {
    const criatura = new Criatura(req.body);
    await criatura.save();
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
