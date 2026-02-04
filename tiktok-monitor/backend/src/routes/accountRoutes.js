import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.post('/', accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);
router.post('/:id/alerts', accountController.addAlert);
router.post('/:id/refresh', accountController.refreshAccountMetrics);

export default router;
