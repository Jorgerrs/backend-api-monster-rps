const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
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

// CRUD routes criaturas
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

// Schema and model usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  alias: { type: String, required: true },
  email: { type: String, required: true },
  //hay que encriptar
  password: { type: String, required: true },
  nivel: { type: Number, required: true },
  //cada 4 victorias subes de nivel
  acumulado: { type: Number, required: true },
  victoria: { type: Number, required: true },
  derrota: { type: Number, required: true },
  empate: { type: Number, required: true },
  unlocked: { type: [String], required: false }
});

const Usuarios = mongoose.model('Usuario', usuarioSchema);

// CRUD routes usuario
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuarios.find();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuarios.create(req.body);
    res.status(201).json(usuarios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuarios.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Podrías generar un token aquí si usas auth
    res.json({
      _id: user._id,
      nombre: user.nombre,
      alias: user.alias,
      email: user.email,
      nivel: user.nivel,
      acumulado: user.acumulado,
      victoria: user.victoria,
      derrota: user.derrota,
      unlocked: user.unlocked
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuarios = await Usuarios.findById(req.params.id);
    if (!usuarios) return res.status(404).json({ error: 'No encontrada' });
    res.json(usuarios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuarios = await Usuarios.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuarios) return res.status(404).json({ error: 'No encontrada' });
    res.json(usuarios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarios = await Usuarios.findByIdAndDelete(req.params.id);
    if (!usuarios) return res.status(404).json({ error: 'No encontrada' });
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
