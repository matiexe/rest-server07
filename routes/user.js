//users.routes

const {Router} = require('express');
const { usersGet, usersDelete, usersPut, usersPost } = require('../controllers/users')
const router = Router();

router.get('/',usersGet)
router.delete('/:id',usersDelete)
router.put('/:id',usersPut)
router.post('/',usersPost)





module.exports = router