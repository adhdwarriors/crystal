const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function doPrompt(prompt) {
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: prompt,
  });
  console.log(completion.data.choices[0].text);
}

const MAIN_QUESTION = 'Which topic amongst these does the following text ' +
  'excerpt best match? Please answer in one lowercase word.';

async function getBestMatch(sphere_names, note) {
  if (sphere_names.length === 0) return undefined; // We cannot match a single sphere name

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${sphere_names}\n${MAIN_QUESTION}\n${note.title}\n${note.desc}`,
  });
  return completion.data.choices[0].text;
}

exports.getBestMatch = getBestMatch;