const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/get-user-details', userController.getUserDetails);
router.put('/update-user-details', userController.updateUserDetails);
router.get('/benchmark-index', userController.getBenchmarkIndex);
router.get('/allocation-strategy', userController.getAllocationStrategy);
router.get('/watchlist', userController.getWatchlist);
router.get('/transactions', userController.getTransactions);
router.get('/performance-reports', userController.getPerformanceReports);
router.get('/risk-assessments', userController.getRiskAssessments);
router.get('/assets', userController.getAssets);
router.get('/portfolios', userController.getPortfolios);
router.get('/funds', userController.getFunds);
router.put('/updatefunds', userController.updateFundDetails);
router.post('/insertfunds', userController.addFundDetails);
router.delete('/riskassessment/:assessmentID', userController.deleteRiskAssessment);

module.exports = router;
