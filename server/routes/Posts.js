const express = require('express')
const path = require('path')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const {Storage} = require('@google-cloud/storage')
const { Posts } = require('../models')
const { Tags } = require('../models')
const addQuerys = require('../controllers/addQuerys');

router.get('/', async (req, res) => {
    let whereCondition = {};  

    addQuerys.addQuery(whereCondition, req)

    const listOfPosts = await Posts.findAll({
        where: whereCondition,
        include: [
            {
                model: Tags,
                as: 'Tags', // Указываем алиас, с которым связана модель Tag
                attributes: [], // Это чтобы не включать атрибуты модели Tag в результат
            }
        ]  
    })

    res.json(listOfPosts)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    const post = await Posts.findByPk(id, {
        include: [
            {
                model: Users,
                attributes: ['id', 'username', 'email'], // Выберите нужные атрибуты пользователя
            }
        ]
    });
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

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, keys.jwt);
        const { userId } = decodedToken;

        post.userId = userId;
        // Создание поста и указание автора (userId)
        const createdPost = await Posts.create(post);

        const tagsReq = req.body.tags.split(';')

        if (tagsReq && Array.isArray(tagsReq)) {
            for (const tagName of tagsReq) {
                // Проверяем, существует ли тег с таким именем
                const [tag, created] = await Tags.findOrCreate({
                    where: { name: tagName }
                });

                if (!created) {
                    // Если тег уже существует, просто добавляем пост в этот тег
                    await createdPost.addTag(tag);
                } else {
                    // Если тег только что создан, добавляем его и связываем с постом
                    await createdPost.addTags(tag);
                }
            }
        }
        res.json(post);
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
});

module.exports = router