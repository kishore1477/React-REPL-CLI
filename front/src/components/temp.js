// approach 1
upload: async () => {
    try {
      // Create a file input element
      const input = document.createElement("input");
      input.type = "file";
  
      // Wrap the file selection logic in a Promise
      const filePromise = new Promise((resolve) => {
        input.addEventListener("change", (event) => {
          const formdata = new FormData();
          formdata.append('file', event.target.files[0]);
          resolve(formdata);
        });
      });
  
      // Trigger file input click and wait for file selection
      input.click();
      const formdata = await filePromise;
  
      // Upload file data to the server
      const response = await axios.post('https://5000-kishore1477-merncli-tvqvbg9kf5v.ws-us107.gitpod.io/api/upload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("response file uploading", response);
      
      // Return the response message to be printed in the terminal
      if (response?.status === 200) {
        return response.data.message;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Return an error message to be printed in the terminal
      return `Failed to upload file: ${error?.message}`;
    }
  },
// approach2
upload: async () => {
    try {
      // Create a promise to handle file selection
      const filePromise = new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.addEventListener("change", (event) => {
          const file = event.target.files[0];
          if (file) {
            resolve(file);
          } else {
            reject(new Error("No file selected"));
          }
        });
        input.click();
      });
  
      // Wait for the file to be selected
      const file = await filePromise;
  
      // Create FormData object and append the file
      const formData = new FormData();
      formData.append('file', file);
  
      // Upload the file using Axios
      const response = await axios.post('https://5000-kishore1477-merncli-tvqvbg9kf5v.ws-us107.gitpod.io/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response?.status === 200) {
        return response.data.message; // Return success message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      return `Error uploading file: ${error.message}`; // Return error message
    }
  }
//   approaches for file upload 
1
import express from 'express';
import multer from 'multer';
import fs from 'fs';

import controller from './controller.js';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'draw-chart/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') { // Accept only CSV files
        cb(null, true);
    } else {
        cb({ error: 'Only CSV files are allowed!' }, false);
    }
};

// Middleware to check if the file already exists
const checkFileExistence = (req, res, next) => {
    const { originalname } = req.file;
    const filePath = `draw-chart/${originalname}`;
    
    if (fs.existsSync(filePath)) {
        // File already exists
        return res.status(400).json({ message: 'File already exists in the directory' });
    }
    
    // File doesn't exist, proceed with uploading
    next();
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

// Attach the middleware to the upload route
router.post('/upload', upload.single('file'), checkFileExistence, controller.uploadFile);
router.delete('/delete/:filename', controller.deleteFile);

export default router;
// 2
import express from 'express';
import multer from 'multer';
import controller from './controller.js';

const storage = multer.memoryStorage(); // Use memory storage instead of disk storage

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        // Accept only CSV files
        cb(null, true);
    } else {
        cb({ error: 'Only CSV files are allowed!' }, false);
    }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post('/upload', upload.single('file'), controller.uploadFile);
router.delete('/delete/:filename', controller.deleteFile);

export default router;


