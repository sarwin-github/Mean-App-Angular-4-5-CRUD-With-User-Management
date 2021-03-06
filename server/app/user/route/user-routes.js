const express   = require('express');
const router    = express();

const userController = require('../controller/user-controller');
const userMiddleware = require('../middleware/user-middleware');

/* login */
router.route('/login').get(userController.getLogin);
router.route('/login').post(userController.postLogin);

router.route('/signup').get(userController.getSignupForm);
router.route('/signup').post(userController.signUp);

router.route('/profile').get(userMiddleware.authorizeAccess, userController.getProfile);
router.route('/list').get(userMiddleware.authorizeAccess, userController.getUserList);
router.route('/update/:id').put(userMiddleware.authorizeAccess, userController.updateUserProfile);
router.route('/delete/:id').delete(userMiddleware.authorizeAccess, userController.deleteUser);

router.route('/logout').get(userController.getLogout);

module.exports = router;
