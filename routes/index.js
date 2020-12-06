
const router = require('express').Router()
const { UserController, TaskController } = require('../controllers')
const { Authentication, Authorization } = require('../middlewares')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.post('/google-login', UserController.googleLogin)
// router.post('/', UserController.githubLogin)

//Authentication Required
// router.use(Authentication)
router.post('/tasks', TaskController.create)
router.get('/tasks', TaskController.getAll)
router.get('/tasks/:id', TaskController.getById);

//Authorization Required
// router.use('/tasks/:id', Authorization);
router.patch('/tasks/:id', TaskController.update)
// router.put('/tasks/:id', TaskController.edit)
router.delete('/tasks/:id', TaskController.delete)


module.exports = router




