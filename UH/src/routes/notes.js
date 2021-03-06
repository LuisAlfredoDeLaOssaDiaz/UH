const express = require('express');
const router = express.Router();

const Note = require('../models/Notes'); // work to get post push delete
const {isAuthenticated} = require('../helpers/auth') // se importa la validacion para saber si esta autenticado el usuario

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

//ruta para guardar y validar dstos de nuevas eps
router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    // valida los errores que se presenten al guardar datos
    const { eps, description, nit } = req.body;
    const errors = [];
    if (!eps) {
        errors.push({text: 'Please Write a EPS.'});
    }
    if (!description) {
        errors.push({text: 'Please Write a desctiption.'});
    }
    if (!nit) {
        errors.push({text: 'Please Write a desctiption.'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            eps,
            description,
            nit
        }); 
        // se guardan los datos en el esquema de eps
    } else {
        const newNote = new Note({eps, description, nit});
        newNote.user = req.user.id
        // console.log(newNote.user);
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfull.');
        res.redirect('/notes');
    }
});


// ruta para mostrar farm eps
router.get('/notes', isAuthenticated, async (req, res) => {
    //res.send('NOTES from database.');
    // console.log(req.user.eps);
    await Note.find({eps: req.user.eps}).sort({date:1}).then(notes => {
        res.render('notes/all-notes', {
            notes: notes.map(Note => Note.toJSON()) 
        })
    })
});


// ruta get para editar eps
router.get('/notes/edit/:id', isAuthenticated, (req,res) => {

    Note.findById(req.params.id).then (note => {
        res.render('notes/edit-note', {
            _id: note._id, 
            title: note.title, 
            description: note.description, 
            nit: note.nit
        })
        //console.log("title: " + note.title + " description: " + note.description);
    });
});

//ruta para editar el contenido de las farmacias eps
router.put('/notes/edit-note/:id', isAuthenticated, async (req,res) => {
    
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfull.')
    res.redirect('/notes');
})

//ruta para eliminar una farmacia
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    //console.log(req.params.id);
    //res.send('ok');
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Delete Successfull.')
    res.redirect('/notes');
} ) 

module.exports = router;