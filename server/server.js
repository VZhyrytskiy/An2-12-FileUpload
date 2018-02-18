const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(fileUpload());

// route
app.post('/upload', (req, res) => {
  if (!req.files)
    return res.status(400).send({ status: 'No files were uploaded.' });

  const uploadedFile = req.files.image; // <--- image - key from FormData
  const pathWithFileName = `${__dirname}/files/${uploadedFile.name}`;

  uploadedFile.mv(pathWithFileName, function(err) {
    if (err) return res.status(500).send(err);

    res.send({ status: 'File uploaded!' });
  });
});

//
app.listen(3000, () => {
  console.log('Express server is running...');
});
