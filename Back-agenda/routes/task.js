const router = require('express').Router();
const tarea = require('../models/tarea');
const user = require('../models/user')

/* Obtengo todas las tareas */
router.get('/:user', async (req, res)=> {
  const us = req.params.user
  if(!us){
    return res.json({
      error: true,
      mensaje: 'Para acceder debe ingresar su nombre de usuario'
    })
  }
  const tareas = await tarea.find({nameUser: us})
  res.json({
    error: false,
    tareas
  })
});

router.post('/addTarea/:user', async (req, res)=> {
  const us = req.params.user
  if(!us){
    return res.json({
      error: true,
      mensaje: 'Para agregar task debe ingresar su nombre de usuario'
    })
  }
  const {titulo, descripcion, hora} = req.body;
  //compruebo que viene un título
  if(!titulo){
    return res.json({
      error: true,
      mensaje: 'debe ingresar un título'
    })
  }
  //compruebo que viene un horario
  if(!hora){
    return res.json({
      error: true,
      mensaje: 'debe ingresar un horario'
    })
  }
  // si todo va bien creo una nueva tarea
  const newTarea = new tarea({
    titulo,
    descripcion,
    hora,
    nameUser: us
  })
  try {
    const guarde = await newTarea.save()
    res.json({
      error: false,
      mensaje: 'La tarea se guardó correctamente'
    })
  } catch (err) {
    res.json({
      error: true,
      datos: err
    })
  }
  
});

//ruta para editar tareas
router.put('/tark/:id', async (req, res)=>{
  const id = req.params.id;
  const actualizar = await tarea.findOneAndUpdate({_id: id}, {$set: req.body});
  try {
    res.json({
      error: false,
      mensaje: 'Actualización correcta'
    })
  } catch (err) {
    res.json({
      error: true,
      dato: err
    })
  }
})

//ruta para eliminar tareas
router.delete('/tark/:id', async (req, res)=>{
  const id = req.params.id;
  const eliminar = await tarea.findOneAndDelete({_id: id});
  try {
    res.json({
      error: false,
      mensaje: 'Se eliminó de forma correcta'
    })
  } catch (err) {
    res.json({
      error: true,
      dato: err
    })
  }
})


module.exports = router;
