const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function test(prompt) {
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: prompt,
  });
  console.log(completion.data.choices[0].text);
}

exports.test = test;