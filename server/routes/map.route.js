import express from 'express'

const router = express.Router();

router.get('/map/getnearby', getNearby);

export default router;