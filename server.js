const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // Respond with the index.html file located in the 'public' directory
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3188;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});