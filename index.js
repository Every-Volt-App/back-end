//import express
const express = require('express');
// instantiate express
const app = express();


app.get('/', (req, res) => {
    res.send('Hello EVoos back-end')
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
