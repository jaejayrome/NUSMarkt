const { Configuration, OpenAIApi } = require("openai");
// require(`dotenv`).config()
const configuration = new Configuration({
    apiKey:  "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",
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const image = await openai.createImage({
        prompt: req.body.prompt,
        n: 1, 
        size: `512x512`
    })

    res.json({
        url: image.data.data[0].url
    })

    return image.data.data[0].url
}

module.exports = {generateImage}
