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

    const context = {};
    const renderRes = `<div class="app-container">${reactApp(
        ilcData.getCurrentReqUrl(),
        context,
        ilcData.getCurrentBasePath(),
    )}</div>`;
    if (context.url) {
        return res.redirect(context.url);
    }
    res.send(renderRes)
});

app.get('*', (req, res) => {
    const context = {};
    const renderRes = `<link rel="stylesheet" href="/public/style.css">` +
        `<div id="root">${reactApp(req.url, context)}</div>` +
        `<script src="/public/client.js"></script>`;
    if (context.url) {
        return res.redirect(context.url);
    }
    res.send(renderRes)
});

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);