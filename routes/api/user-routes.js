const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    User.findAll() //(equivalent to) SELECT * FROM users; 
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET 1 user based on parameters
router.get('/:id', (req, res) => {
    User.fineOne({
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

// PUT to update existing data
router.put('/:id', (req, res) => {
    // combines create and look up data
    User.update(req.body, {
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