import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';
import cors from 'cors';
import cheerio from 'cheerio';

const app = express();
const port = 8000;

app.use(cors());

function calculateChecksum(content) {
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
}

app.get('/api/checksum', async (req, res) => {
  try {
    // Fetch the HTML file from the DevServer
    const htmlResponse = await fetch('http://localhost:3002/index.html'); // Adjust if necessary
    if (!htmlResponse.ok) throw new Error(`HTTP error! status: ${htmlResponse.status}`);
    const htmlContent = await htmlResponse.text();

    // Use cheerio to parse the HTML and find the script tag with the hashed filename
    const $ = cheerio.load(htmlContent);
    const scriptSrc = $('script[src^="main."]').attr('src'); // This selector assumes that the file starts with 'bundle.'

    // Fetch the script file from the DevServer
    const scriptResponse = await fetch(`http://localhost:3002/${scriptSrc}`);
    if (!scriptResponse.ok) throw new Error(`HTTP error! status: ${scriptResponse.status}`);
    const scriptContent = await scriptResponse.buffer();

    // Calculate and send the checksum
    const checksum = calculateChecksum(scriptContent);
    res.json({ [scriptSrc]: checksum,'checksum':checksum });
  } catch (error) {
    console.error('Failed to fetch and checksum the bundle:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Checksum API running at http://localhost:${port}/api/checksum`);
});