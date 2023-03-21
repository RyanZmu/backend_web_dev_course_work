const express = require('express')
const tourController = require('../controllers/tourController');

const router = express.Router();

// app.use('/api/v1/tours', tourRouter) //use middleware to create a router

router.route('/') // root of this route is now /api/v1/tours
.get(tourController.getAllTours)
.post(tourController.createTour)

router.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;