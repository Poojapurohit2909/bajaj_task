const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Multer storage configuration for file uploads (base64 encoded)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint: /bfhl
app.post('/bfhl', upload.single('file_b64'), (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    // Validate JSON input
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]$/.test(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [Math.max(...lowercaseAlphabets.map(char => char.charCodeAt(0)))] : [];

    // Check if prime number exists in numbers array
    const isPrimeFound = numbers.some(num => {
      num = parseInt(num);
      if (num <= 1) return false;
      for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
      }
      return true;
    });

    // File handling
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKb = 0;

    if (file_b64) {
      const buffer = Buffer.from(file_b64, 'base64');
      fileValid = true;
      fileMimeType = 'application/octet-stream';  // Placeholder for MIME type
      fileSizeKb = buffer.length / 1024;
    }

    // Response format
    return res.json({
      is_success: true,
      user_id: 'john_doe_17091999',
      email: 'john@xyz.com',
      roll_number: 'ABCD123',
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      is_prime_found: isPrimeFound,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint: /bfhl
app.get('/bfhl', (req, res) => {
  return res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
