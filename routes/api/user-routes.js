const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    User.findAll({ //(equivalent to) SELECT * FROM users; 
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET 1 user based on parameters
router.get('/:id', (req, res) => {
    User.fineOne({
        attributes: { 
            include: [
                {
                  model: Post,
                  attributes: ['id', 'title', 'post_url', 'created_at']
                },
                {
                  model: Post,
                  attributes: ['title'],
                  through: Vote,
                  as: 'voted_posts'
                }
              ],
            exclude: ['password']
         },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            // everything is ok, client asked for wrong data
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            // internal server error
            console.log(err);
            res.status(500).json(err);
        });
});

// POST to create a user
router.post('/', (req, res) => {
    // pass in key/value pairs; keys user model, values from req.body
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that email addres! ' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password! '});
                return;
            }

            res.json({ user: dbUserData, message: 'You are now loggin in! ' });
        });
});

// PUT to update existing data
router.put('/:id', (req, res) => {
    // combines create and look up data
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE user from data
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;