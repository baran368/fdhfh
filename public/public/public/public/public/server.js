const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/generate-qrcode', (req, res) => {
    const { cafeName, menuItems } = req.body;
    const menuContent = `<h1>${cafeName}</h1><p>${menuItems.replace(/,/g, '<br>')}</p>`;
    const url = `http://localhost:${port}/menu.html?content=${encodeURIComponent(menuContent)}`;

    qrcode.toDataURL(url, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            res.status(500).send('Error generating QR code');
            return;
        }
        res.json({ qrCodeUrl });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
