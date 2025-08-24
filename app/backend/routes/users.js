const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { getUserProgress, handleUserLogin, updateUserProgress } = require('../controllers/apicontroller');

router.get('/progress', ClerkExpressRequireAuth(), getUserProgress);
router.post('/login', ClerkExpressRequireAuth(), handleUserLogin);
router.put('/progress', ClerkExpressRequireAuth(), updateUserProgress);

module.exports = router;