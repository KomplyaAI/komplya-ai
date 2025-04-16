import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

