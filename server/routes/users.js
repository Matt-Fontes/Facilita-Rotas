const { Router } = require('express');
const userController = require('./../controllers/users')

const router = Router();

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/route', userController.getUsersRoute)

module.exports = router;