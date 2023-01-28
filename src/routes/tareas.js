const express = require('express');
const router = express.Router();

const Tarea = require('../models/Tarea');

router.get('/', async (req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
});

router.post('/', async (req, res) =>{
   const tarea = new Tarea(req.body);
   await tarea.save();
   res.json({
       status: 'Tarea creada'
   });
});


router.put('/:id', async (req, res) => {
    await  Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Tarea modificada'
    });
});

router.delete('/:id', async (req, res) => {
    await  Tarea.findByIdAndRemove(req.params.id);

    res.json({
        status: 'Tarea Eliminada'
    });
});
module.exports = router;
