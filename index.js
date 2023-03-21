const express = require("express");
const { Configuration, OpenAIApi } = require("openai")
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const { fileUrlToPath } = require("node:url");
const API_KEY = process.env.AI_KEY;
const path = require("path");
// Setup OPEN AI
const configuration = new Configuration({
    apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/dist"))
    const indexPath = path.resolve(__dirname, './client/dist', 'index.html');
    app.get('*', (req, res) => res.sendFile(indexPath));
}

const postPrompt = async (req, res) => {
    try {
        const { prompt } = req.body;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        })

        const response = completion.data.choices[0].message;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error)
    }
}

app.get('/', async (req, res) => {
    res.send("Started Application")
})

app.post('/api/prompt', postPrompt);



const start = async () => {
    app.listen(5000, () => console.log("Server started on http://localhost:5000"))
}



start()

