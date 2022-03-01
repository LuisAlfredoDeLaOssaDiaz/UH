const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/muh', {
})
    .then(db => {
        console.log('DabaBase M.U.H is connect.');
    })
    .catch(err => { console.error(err) });