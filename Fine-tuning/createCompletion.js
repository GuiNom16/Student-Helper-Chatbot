import { openai } from "./api.js";

async function createCompletion() {
  try {
    const response = await openai.createCompletion({
      model: "davinci:ft-personal-2023-04-07-20-28-18",
      prompt: "who is module coordinator for advanced web developoment?0",
      max_tokens: 200,
      temperature: 0.7,
    });
    if (response.data) {
      console.log("Choice: ", response.data.choices[0].text.split("\n")[0]);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

createCompletion();

//model for joebot: davinci:ft-personal-2023-04-07-20-28-18
