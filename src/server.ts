import express, { Request, Response } from 'express';
import path from 'path';
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    // Respond with the index.html file located in the 'public' directory
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 3188;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});