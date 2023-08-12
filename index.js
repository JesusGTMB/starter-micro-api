const express = require('express');
const app = express();
const { Resend } = require('resend');
const fs = require('fs');
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile('form.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo');
    } else {
      res.send(data);
    }
  });
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await resend.emails.send({
      from: 'Jesustorres.Dev <onboarding@resend.dev>',
      to: ['jesusgtmb@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
    });
    res.send('Mensaje enviado con éxito');
  } catch (error) {
    res.send('Hubo un error al enviar el mensaje');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
