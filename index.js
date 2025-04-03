require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const API_KEY = process.env.API_KEY;

app.get('/', async (req, res) => {
  const city = req.query.ville || 'Paris';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const meteo = {
      ville: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icone: data.weather[0].icon
    };
    res.render('meteo', { meteo });
  } catch (error) {
    res.render('meteo', { meteo: null, erreur: "Ville non trouvée ou erreur API." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Serveur lancé sur http://localhost:${PORT}`);
});
