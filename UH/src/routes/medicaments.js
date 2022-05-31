const express = require('express');
const router = express.Router();

const Drug = require('../models/medicaments'); // work to get post push delete
const {isAuthenticated} = require('../helpers/auth')


// router.post('/notes/new-note', isAuthenticated, async (req, res) => {
//     const { eps, description } = req.body;
//     const errors = [];
//     if (!eps) {
//         errors.push({text: 'Please Write a EPS.'});
//     }
//     if (!description) {
//         errors.push({text: 'Please Write a desctiption.'});
//     }
//     if(errors.length > 0) {
//         res.render('notes/new-note', {
//             errors,
//             eps,
//             description
//         }); 
//     } else {
//         const newNote = new Note({eps, description});
//         newNote.user = req.user.id
//         //console.log(newNote);
//         await newNote.save();
//         req.flash('success_msg', 'Note Added Successfull.');
//         res.redirect('/notes');
//     }
// });

router.post('/searchMedicaments', isAuthenticated, (req, res) => {
    const { search } = req.body;
    console.log(req)
    res.redirect('/medicaments/name/'+search)
})

router.get('/medicaments/name/:name', isAuthenticated, async (req, res) => {
    // res.send('DRUGS from database.');

    await Drug.find({name: req.params.name}).then(drugs => {
        // console.log(drugs)
        res.render('notes/all-medicaments', { 
            drugs: drugs.map(Drug => Drug.toJSON())
        })
    });
});

router.get('/medicaments/:nit', isAuthenticated, async (req, res) => {
    // res.send('DRUGS from database.');

    await Drug.find({nit: req.params.nit}).then(drugs => {
        // console.log(drugs)
        res.render('notes/all-medicaments', { 
            drugs: drugs.map(Drug => Drug.toJSON())
        })
    });
});

// router.get('/searchMedicaments/:nit/:name', (req, res) => {
//     console.log(req.params.nit)
//     console.log(req.params.name)
// })
// def storess(): 
//     id = request.form['search']
//     if id:
//         print(id)
//     else:
//         id=0
    
//     rute = '/stores/{0}'.format(id)
//     return redirect(rute)

// @app.route('/stores/<id>', methods=['GET'])
// def stores(id):
//     url3 = "https://petstore.swagger.io/v2/store/order/{0}".format(id)
//     response = (requests.get(url3))
//     response_json = response.json()
//     #od = list(response_json.values())
//     data_stores = [(i) for i in response_json.values()]
//     #print(data_stores)


// router.get('/notes/edit/:id', isAuthenticated, (req,res) => {

//     Note.findById(req.params.id).then (note=> {
//         res.render('notes/edit-note', {
//             _id: note._id, 
//             title: note.title, 
//             description: note.description    
//         })
//         //console.log("title: " + note.title + " description: " + note.description);
//     });
// });

// router.put('/notes/edit-note/:id', isAuthenticated, async (req,res) => {
    
//     const { title, description } = req.body;
//     await Note.findByIdAndUpdate(req.params.id, {title, description});
//     req.flash('success_msg', 'Note Updated Successfull.')
//     res.redirect('/notes');
// })

// router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
//     //console.log(req.params.id);
//     //res.send('ok');
//     await Note.findByIdAndDelete(req.params.id);
//     req.flash('success_msg', 'Note Delete Successfull.')
//     res.redirect('/notes');
// } ) 

module.exports = router;