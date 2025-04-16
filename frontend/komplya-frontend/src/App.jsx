import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setTranscript(response.data.transcript);
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Komplya AI</h1>

      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Transcribing...' : 'Upload & Transcribe'}
      </button>

      {transcript && (
        <>
          <h3>Transcript:</h3>
          <pre>{transcript}</pre>
        </>
      )}
    </div>
  );
}

export default App;
