const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs').promises;
const mime = require('mime-types');

const app = express();
const upload = multer({ dest: 'uploads/' });

const ANTHROPIC_KEY = process.env.CLAUDE_API_KEY;
const MODEL = "claude-3-sonnet-20240229";
const SYSTEM_PROMPT = "日本語で答えて";

app.post('/api/claude', upload.single('image'), async (req, res) => {
  try {
    const { message } = req.body;
    const imageFile = req.file;

    const content = [{ type: "text", text: message }];

    if (imageFile) {
      const imgBase64 = await imageToBase64(imageFile.path);
      content.unshift({
        type: "image",
        source: {
          type: "base64",
          media_type: mime.lookup(imageFile.originalname),
          data: imgBase64,
        },
      });
    }

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: MODEL,
        max_tokens: 1024,
        temperature: 0.7,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': ANTHROPIC_KEY,
        },
      }
    );

    res.json({ response: response.data.content[0].text });

    // 一時ファイルの削除
    if (imageFile) {
      await fs.unlink(imageFile.path);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

async function imageToBase64(filePath) {
  const file = await fs.readFile(filePath);
  return file.toString('base64');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
