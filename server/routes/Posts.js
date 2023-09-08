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
                as: 'Tags', 
                attributes: [], 
            }
        ]  
    })

    res.json(listOfPosts)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    const post = await Posts.findByPk(id, {
        // include: [
        //     {
        //         model: Users,
        //         attributes: ['id', 'username', 'email'], // Выберите нужные атрибуты пользователя
        //     }
        // ]
    });
    res.json(post);
})

router.post("/", upload.single('image'), async (req, res) => {
    const post = req.body;
    const imageFile = req.file;
    const keyPath = path.join(__dirname, "../sinuous-studio-376508-4fbe736302a0.json")
    
    post.imageURL = createImage(imageFile, keyPath)

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, keys.jwt);
        const { userId } = decodedToken;

        post.userId = userId;

        const createdPost = await Posts.create(post);

        const tagsReq = req.body.tags.split(';')

        await addTags(tagsReq, createdPost)

        res.json(post);
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const postData = req.body;
  const imageFile = req.file;
  const keyPath = path.join(__dirname, "../sinuous-studio-376508-4fbe736302a0.json")

  const existingPost = await Posts.findByPk(id);
  
  if (!existingPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;

    if (existingPost.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await deleteFileFromStorage(existingPost.imageURL, keyPath)
    postData.imageURL = createImage(imageFile, keyPath)

    await existingPost.update(postData);

    await existingPost.setTags([]);
    const tagsReq = req.body.tags.split(';')

    await addTags(tagsReq, existingPost)

    res.json(existingPost);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const keyPath = path.join(__dirname, "../sinuous-studio-376508-4fbe736302a0.json")

  const existingPost = await Posts.findByPk(id);

  if (!existingPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt);
    const { userId } = decodedToken;

    if (existingPost.userId !== userId) {
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

function createImage(imageFile, keyPath) {
    if (imageFile) {
        const gc = new Storage({
            keyFilename: keyPath,
            projectId: 'sinuous-studio-376508'
        });
        const myBucket = gc.bucket('mybudget');
    
        const uniqueFileName = Date.now() + "_" + imageFile.originalname;
    
        myBucket.file(uniqueFileName).save(imageFile.buffer)
    
        return `https://storage.googleapis.com/mybudget/${uniqueFileName}`;
    }
    else {
        return 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
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

module.exports = router