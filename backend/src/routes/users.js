const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser, updateUser } = require('../controllers/usersController');
router.route('/')
.get(getUsers)
.post(createUser)
router.route('/:id')
.put(updateUser)
.delete(deleteUser)

module.exports =  router;