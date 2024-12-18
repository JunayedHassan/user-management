const router = require('express').Router();
const {UserReg, UserLogin, UserLogout, SingerUserProfileRead, AllUserProfileRead, UserUpdate, UserDelete} = require('../controllers/UserController');
const AuthVerification = require('../middlewares/AuthVerification');

//user router
router.get('/user-reg',UserReg)
router.post('/user-login',UserLogin);
router.post('/user-logout',AuthVerification, UserLogout);
router.get('/single-user-read',AuthVerification, SingerUserProfileRead);
router.get('/all-user-read',AuthVerification, AllUserProfileRead);
router.patch('/user-update',AuthVerification, UserUpdate);
router.delete('/user-delete',AuthVerification, UserDelete);


module.exports = router;