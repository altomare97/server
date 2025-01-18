const express = require('express');
const app = express();
const port = process.env.PORT || 10000;
const axios = require('axios');

// Middleware per gestire JSON
app.use(express.json());

// Endpoint di test
app.get('/', (req, res) => {
  res.send('Server funzionante!');
});

// Endpoint per restituire dati fittizi (simula un inverter)
app.get('/api/inverter', (req, res) => {
  const data = {
    status: 'online',
    powerOutput: '5.6 kW',
    lastUpdated: new Date().toISOString(),
  };
  res.json(data);
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});

app.post('/api/config', (req, res) => {
    const { deviceId, config } = req.body;
    console.log(`Configurazione ricevuta per il dispositivo ${deviceId}:`, config);
    res.json({ message: 'Configurazione salvata con successo!' });
  });

  // Sostituisci http://inverter-ip/api/data con l'indirizzo reale dell'inverter
  app.get('/api/inverter/live', async (req, res) => {
    try {
      const response = await axios.get('http://inverter-ip/api/data');
      res.json(response.data);
    } catch (error) {
      console.error('Errore nella lettura dei dati:', error.message);
      res.status(500).json({ error: 'Impossibile connettersi all’inverter' });
    }
  });

  // Endpoint per il login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Logica di esempio per il login
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, message: 'Login effettuato con successo' });
  } else {
    res.json({ success: false, message: 'Credenziali non valide' });
  }
});

// Endpoint per i log
app.get('/logs', (req, res) => {
  const sampleLogs = [
    'Log 1: Utente ha effettuato il login',
    'Log 2: Dati richiesti al server',
    'Log 3: Errore nella connessione al database',
    'Log 4: Utente disconnesso',
    'Log 5: Server avviato',
  ];
  res.json({ logs: sampleLogs });
});
  
