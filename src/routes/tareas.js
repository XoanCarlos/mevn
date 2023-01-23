const express = require('express');
const router = express.Router();

const Tarea = require('../models/Tarea');

router.get('/', async (req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
});


module.exports = router;
