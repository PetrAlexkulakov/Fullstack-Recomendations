const express = require('express')
const path = require('path')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {Storage} = require('@google-cloud/storage')
const { Posts } = require('../models')

router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    const post = await Posts.findByPk(id);

    res.json(post);
})

router.post("/", upload.single('image'), async (req, res) => {
    const post = req.body;
    const imageFile = req.file;
    const keyPath = path.join(__dirname, "../sinuous-studio-376508-4fbe736302a0.json")
    
    const gc = new Storage({
        keyFilename: keyPath,
        projectId: 'sinuous-studio-376508'
    });
    const myBucket = gc.bucket('mybudget');

    const uniqueFileName = Date.now() + "_" + imageFile.originalname;

    myBucket.file(uniqueFileName).save(imageFile.buffer)

    post.imageURL = `https://storage.googleapis.com/mybudget/${uniqueFileName}`;

    await Posts.create(post);
    res.json(post);
});

module.exports = router