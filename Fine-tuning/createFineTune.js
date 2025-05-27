import { openai } from "./api.js";

async function createFineTune() {
  try {
    //using hyperparameters to make model work better with smaller datasets
    const response = await openai.createFineTune({
      training_file: "file-1VnbcpWKODt3VZbPyuPZHun5",
      model: "davinci",
      learning_rate_multiplier: 0.02,
      n_epochs: 40,
      batch_size: 1,
    });
    console.log("response: ", response);
  } catch (err) {
    console.log("error: ", err.response.data.error);
  }
}

createFineTune();

//training file for joebot: file-uzHUqk6uvAOKvXmc1owRJmVa
//training file for querybot: file-1VnbcpWKODt3VZbPyuPZHun5
