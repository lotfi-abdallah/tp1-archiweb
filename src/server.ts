import express, { Request, Response } from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';

const options = {
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem'))
}

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    // Respond with the index.html file located in the 'public' directory
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 3188;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
});