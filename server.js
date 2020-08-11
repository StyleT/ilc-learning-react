const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const reactApp = require('./build/server').default;

// We need it to serve /client.js & /style.css
// cors() is necessary to get rid of the any CORS issues, suitable for development env only!
app.use('/public', cors(), express.static('build'), express.static('public'));

const IlcSdk = require('ilc-server-sdk').default;
const ilcSdk = new IlcSdk({ publicPath: '/public/' });
app.get('/microfrontend', (req, res) => {
    // More info here https://github.com/namecheap/ilc/blob/master/docs/ilc_app_interface.md
    const ilcData = ilcSdk.processRequest(req);
    ilcSdk.processResponse(ilcData, res, {
        appAssets: {
            spaBundle: 'client.js',
            cssBundle: 'style.css'
        },
    });

    res.send(`<div class="app-container">${reactApp()}</div>`)
});

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);