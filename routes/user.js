//users.routes

const {Router} = require('express');
const { usersGet, usersDelete, usersPut, usersPost } = require('../controllers/users')
const router = Router();

router.get('/',usersGet)
router.delete('/',usersDelete)
router.put('/',usersPut)
router.post('/',usersPost)





module.exports = router