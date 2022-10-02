const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require("dotenv")
const cors = require('cors');
const fs = require('fs');
const imageModel = require('./models')
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config()
const port = process.env.PORT || 3000

mongoose
    .connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true, useUnifiedTopology: true
        }
    )
    .then(() => console.log("DBConnection"))
    .catch((err) => {
        console.log(err);
    });

const stroage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: stroage })

app.post('/', upload.single('testImage'), (req, res) => {
    const length = req.file.originalname.split('.').length;
    const saveImage = imageModel({
        name: req.body.name,
        img: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: req.file.originalname.split('.')[length - 1],
        },
    });
    saveImage
        .save()
        .then((res) => {
            console.log("image is saved");
        })
        .catch((err) => {
            console.log(err, "error has occur");
        });
    res.send('image is saved')
})

app.get("/", async (req, res) => {
    const allData = await imageModel.find();
    res.json(allData);
})

app.listen(port, () => {
    console.log("running.")
})
