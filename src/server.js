import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// configs
const app = express();
const PORT = process.env.PORT || 5433;
// middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}!`);
});