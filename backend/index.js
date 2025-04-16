import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server OK');
});

app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const audioBuffer = req.file.buffer;
    const mimetype    = req.file.mimetype;

    // sanity-check that .env loaded correctly
    console.log('Deepgram API Key:', process.env.DEEPGRAM_API_KEY);

    const response = await axios.post(
      'https://api.deepgram.com/v1/listen?language=en-US',
      audioBuffer,
      {
        headers: {
          // <-- note the "Token " prefix here
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
          'Content-Type': mimetype
        },
      }
    );

    const transcriptText = response
      .data
      .results
      .channels[0]
      .alternatives[0]
      .transcript;

    res.json({ transcript: transcriptText });

  } catch (err) {
    // more verbose logging of Deepgram’s error payload
    console.error(
      'Deepgram error response:',
      err.response?.data || err
    );
    return res
      .status(500)
      .json({ error: 'Transcription failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
