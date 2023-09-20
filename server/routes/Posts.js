const express = require('express')
const path = require('path')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const {Storage} = require('@google-cloud/storage')
const { Posts, Tags, Comments } = require('../models')
const addQuerys = require('../controllers/addQuerys');
const { checkAuth } = require('../controllers/checkAuth');

const keyPath = path.join(__dirname, "../sinuous-studio-376508-4fbe736302a0.json")

router.get('/', async (req, res) => {
    let whereCondition = {};  

    addQuerys.addQuery(whereCondition, req)

    try {
        const { sortType } = req.query;
        const order = sortType === 'rating' ? [['raiting', 'DESC']] : [['createdAt', 'DESC']];

        const listOfPosts = await Posts.findAll({
            where: whereCondition,
            include: [
                {
                    model: Tags,
                    as: 'Tags', 
                    attributes: [], 
                },
                {
                    model: Comments,
                    as: 'comments',
                    attributes: [],
                }
            ],
            order: order 
        })

        res.json(listOfPosts)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed' });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.post("/:autorId?", upload.single('image'), async (req, res) => {
    const post = req.body;
    const imageFile = req.file;
    const autorId = req.params.autorId;

    if (checkAuth(req.headers.authorization)) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, keys.jwt);
        const { userId, isAdmin } = decodedToken;

        post.imageURL = await createImage(imageFile, keyPath)

        if (autorId === 'undefined' || autorId === undefined) {
            post.userId = userId;
        } else if (isAdmin) {
            post.userId = autorId;
        }

        const createdPost = await Posts.create(post);

        if (req.body.tags) {
            const tagsReq = req.body.tags.split(';')
            await addTags(tagsReq, createdPost)
        }

        res.json(post);
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const postData = req.body;
  const imageFile = req.file;
  

  const existingPost = await Posts.findByPk(id);
  
  if (!existingPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (checkAuth(req.headers.authorization)) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId, isAdmin } = decodedToken;

    if (existingPost.userId !== userId && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await deleteFileFromStorage(existingPost.imageURL, keyPath)
    postData.imageURL = await createImage(imageFile, keyPath)

    await existingPost.update(postData);

    await existingPost.setTags([]);
    if (req.body.tags) {
        const tagsReq = req.body.tags.split(';')
        await addTags(tagsReq, existingPost)
    }

    res.json(existingPost);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  

  const existingPost = await Posts.findByPk(id);

  if (!existingPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (checkAuth(req.headers.authorization)) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId, isAdmin } = decodedToken;

    if (existingPost.userId !== userId && !isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await existingPost.setTags([]);

    if (existingPost.imageURL) {
      await deleteFileFromStorage(existingPost.imageURL, keyPath);
    }

    await existingPost.destroy();

    return res.status(204).send();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

async function createImage(imageFile, keyPath) {
    if (imageFile) {
        const gc = new Storage({
            keyFilename: keyPath,
            projectId: 'sinuous-studio-376508'
        });
        const myBucket = gc.bucket('mybudget');
    
        const uniqueFileName = Date.now() + "_" + imageFile.originalname;
    
        await myBucket.file(uniqueFileName).save(imageFile.buffer)
    
        return `https://storage.googleapis.com/mybudget/${uniqueFileName}`;
    }
    else {
        return 'https://storage.googleapis.com/mybudget/jk-placeholder-image.jpg'
    }
}

async function addTags(tagsReq, createdPost) {
    if (tagsReq && Array.isArray(tagsReq)) {
        for (const tagName of tagsReq) {
            const [tag, created] = await Tags.findOrCreate({
                where: { name: tagName }
            });

            if (!created) {
                await createdPost.addTag(tag);
            } else {
                await createdPost.addTags(tag);
            }
        }
    }
}

async function deleteFileFromStorage(imageURL, keyPath) {
    if (imageURL !== 'https://storage.googleapis.com/mybudget/jk-placeholder-image.jpg') {
        const gc = new Storage({
            keyFilename: keyPath,
            projectId: 'sinuous-studio-376508'
        });
        const myBucket = gc.bucket('mybudget');
        const file = myBucket.file(imageURL.replace('https://storage.googleapis.com/mybudget/', ''));
    
        file.delete().then(() => {
            console.log(`Файл ${imageURL} успешно удален.`);
        }).catch((err) => {
            console.error(`Ошибка при удалении файла ${imageURL}:`, err);
        });
    }
}

module.exports = router