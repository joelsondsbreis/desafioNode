const express = require('express');
// const Spawn = require('child_process').spawn;
const ChromeLauncher = require('chrome-launcher');
const alert = require('alert');





const app = express();
app.use(express.json());
const port = 3000;

const alerts = [];

app.post('/alert', (req, res) => {
    const { message } = req.body;

    const alert = {
        message
    }

    alerts.push(message);
    emitAlert(message);
    return res.status(201).json(alert);
});

function emitAlert(message) {

    ChromeLauncher.launch({
        startingUrl: 'https://www.huggy.io/pt-br'
      }).then(chrome => {
          alert(message);
      });
}

/**
 * Para testar com Spawn basta descomentar o trecho da funcao emitAlert abaixo e comentar o de cima. 
 * Infelizmente nao consegui emitir o alert no browser apos abrir, ficarei devendo um estudo mais profundo sobre child_process.
 * De qualquer forma passa a mensagem "Eu tenho a forca" no body no alert do sistema apos a requisicao post no http://localhost:3000/alert
 */

// function emitAlert(req, message) {

//     return new Promise((resolve, reject) => {

//         Spawn('google-chrome', [
//             'https://www.huggy.io/pt-br',
//             // '--headless',
//             '--disable-gpu',
//             '--no-sandbox',
//             '--remote-debugging-port=9222',
//             '--remote-debugging-address=0.0.0.0',
//             '--user-data-dir=data',
//             '--no-first-run',
//             '--disable-popup-blocking',
//             '--disable-infobars',
//             '--start-maximized',
//             '--use-fake-device-for-media-stream',
//             '--mute-audio',
//             '--ignore-certificate-errors'
//         ]);
        
//     })
// }










app.listen(port, () => console.log(`Servidor ouvindo a porta ${port}!`));