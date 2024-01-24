import express from 'express';
// const express  = require('express');

const app  = express();
const port = process.env.port || 3000; 

app.get('/', (req,res) => {
    res.send('Server is ready')
});

app.get('/api/jokes', (req,res) => {
    const jokes = [
        { id: 1, title: 'Ist joke', joke: "Why don't scientists trust atoms? Because they make up everything!" },
        { id: 2, title: 'Second joke', joke: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!" },
        { id: 3, title: 'Third joke', joke: "I told my wife she was drawing her eyebrows too high. She looked surprised." },
        { id: 4, title: 'Fourth joke', joke: "Why don't skeletons fight each other? They don't have the guts." },
        { id: 5, title: 'Fifth joke', joke: "Why did the scarecrow win an award? Because he was outstanding in his field!" }
      ];
   res.send(jokes)
      
})
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})
