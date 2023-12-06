import express from 'express'
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/processar', (req, res) => {
  try {
    const numero = parseInt(req.body.numero, 10);

    const resultado = numero + 2;

    res.json({ resultado });

  } catch (error) {
    console.log('Erro no servidor', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

try {
  app
    .listen(3000)
    .once('listening', () =>
      console.log(`🚀 Server is running on port 3000`),
    )
} catch (error) {
  console.error('🔥 Error running the server: ', error)
}