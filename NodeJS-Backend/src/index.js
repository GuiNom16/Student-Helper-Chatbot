// Requiring module
const express = require("express");
const { openai } = require("./openai");
const app = express();
const path = require("path");
const cors = require("cors");

// Set public as static directory
app.use(express.static("public"));
app.use(cors());

//app.set("views", path.join(__dirname, "/views"));

// Use ejs as template engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Render main template
app.get("/", (req, res) => {
  res.json({ message: "lmao this is main" });
});

app.post("/getJoebotResponse", (req, res) => {
  let prompt = req.body.text[0].text;
  console.log(prompt);
  async function createCompletion() {
    try {
      const response = await openai.createCompletion({
        model: "davinci:ft-personal-2023-04-07-20-28-18",
        prompt: prompt,
        max_tokens: 200,
        temperature: 0,
        stop: ["\n"],
      });
      if (response.data) {
        let reply = response.data.choices[0].text.split("\n")[0].split("->");
        return res.json({
          message: reply[1],
        });
      }
    } catch (err) {
      return err;
    }
  }
  createCompletion();
});

app.post("/getQuerybotResponse", (req, res) => {
  let prompt = req.body.text[0].text;
  console.log(prompt);
  async function createCompletion() {
    try {
      const response = await openai.createCompletion({
        model: "davinci:ft-personal-2023-04-25-23-32-01",
        prompt: prompt,
        max_tokens: 200,
        temperature: 0,
        stop: ["\n"],
      });
      if (response.data) {
        let reply = response.data.choices[0].text.split("\n")[0].split("->");
        return res.json({
          message: reply[1],
        });
      }
    } catch (err) {
      return err;
    }
  }
  createCompletion();
});

// Server setup
app.listen(3000, () => {
  console.log("The server started running on port 3000");
});
