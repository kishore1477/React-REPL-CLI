import fs from 'fs'
import multer from 'multer'
import csv from 'csv-parser';
// Custom Multer storage engine
const customStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, 'draw-chart/');
    },
    filename: function(req, file, cb) {
        // Check if the file already exists
        const filePath = `draw-chart/${file.originalname}`;
        console.log("filePath",filePath)
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                // File already exists
                return cb(new Error('File already exists in the directory'), null);
            } else {
                console.log("re in deswc", file)
                if(file?.mimetype !=='text/csv'){
                    return cb(new Error('Only CSV files are allowed'), null);
                }
                // File doesn't exist, proceed with uploading
                cb(null, file.originalname);
            }
        });
    }
});

// Multer configuration with custom storage engine
const upload = multer({ storage: customStorage }).single('file');
class controller {
    static uploadFile = async (req, res) => {
        try {
            // console.log("req f",req)
            // Handle the file upload using Multer
            upload(req, res, (err) => {
    
                if (err) {
                    console.error('Error uploading file:', err);
                    console.log("error cnsl", err)
                    return res.status(400).json({ message: err.message ,err});
                }
                // File uploaded successfully
                return res.status(200).json({ message: "File uploaded successfully." });
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).json({ message: 'Failed to upload file', error });
        }
    }
static deleteFile = (req,res)=>{
    const { filename } = req.params;
    const filePath = `draw-chart/${filename}.csv`;
    // Check if the file exists
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            return res.status(404).json({ message: 'File not found' });
        }
        // File exists, proceed with deletion
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to delete file', err });
            } else {
                return res.status(200).json({ message: 'File deleted successfully' });
            }
        });
    });
}
static drawChart = async (req, res) => {
    try {
        const { filename, columns } = req.body;
        console.log("filename",filename)
        console.log("columns",columns)
        const filePath = `draw-chart/${filename}.csv`; // Assuming the file format is CSV
        
        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error(err);
                return res.status(404).json({ message: 'File not found' });
            }

            // Read the CSV file and extract data from the specified columns
            const data = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    const rowData = {};
                    columns.forEach(col => {
                        rowData[col] = row[col]; // Assuming column names match CSV headers
                    });
                    data.push(rowData);
                })
                .on('end', () => {
                    return res.status(200).json({ message: 'Chart drawn successfully', data });
                });
        });
    } catch (error) {
        console.error('Error drawing chart:', error);
        return res.status(500).json({ message: 'Failed to draw chart', error });
    }
}
}

export default controller