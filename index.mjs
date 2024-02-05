import express from 'express';
import axios from 'axios';
import geoip from 'geoip-lite';

const app = express();
const port = 3000;

// **Reemplaza "YOUR_LICENSE_KEY" con tu ID de licencia de MaxMind**


app.get('/', async (req, res) => {
  try {
    console.log("Obteniendo IP pública...");
    
    // Usar un servicio externo para obtener la IP pública
    const response = await axios.get('https://api.ipify.org?format=json');
    const ip = response.data.ip;

    console.log("IP pública obtenida:", ip);

    // Consultar MaxMind con la IP obtenida
    const geoData = await geoip.lookup(ip);
    res.json(geoData);
  } catch (error) {
    console.error("Error capturado:", error);
    res.status(500).send('Error al obtener la geolocalización');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


