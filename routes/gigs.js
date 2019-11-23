const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => {
    // const gigs = Gig.findAll({ limit: 1, offset: 1 }) // For pagination
    const gigs = Gig.findAll()
    .then(gigs => {
        console.log(gigs);
        // res.status(200).send(gigs);
        res.render('gigs', {
            gigs: gigs
        });
    })
    .catch(error => console.log('Error: ' + error));
});

router.get('/create', (req, res) => {
    res.render('create');
});

// Add gig
router.post('/create', (req, res) => {
    let {title, technologies, budget, description, contact_email} = req.body;
    let errors = [];
    // Validate field
    if(!title) {
        errors.push({text: 'Please add the title'})
    }
    if(!technologies) {
        errors.push({text: 'Please add the technologies'})
    }
    if(!budget) {
        errors.push({text: 'Please add the budget'})
    }
    if(!description) {
        errors.push({text: 'Please add the description'})
    }
    if(!contact_email) {
        errors.push({text: 'Please add the contact_email'})
    }

    if(errors.length > 0) {
        res.render('create', {errors, title, technologies, budget, description, contact_email})
    }else {
        // Replace comma and space into only comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');
        // Insert
        Gig.create({title, technologies, budget, description, contact_email})
        .then(gig => {
            // res.status(200).send(gig)
            res.redirect('/gigs')
        })
        .catch(error => console.log('Error: ' + error));
    }
})

router.get('/search', (req, res) => {
    let {term} = req.query;
    term = term.toLowerCase();
    
    console.log(term);
    Gig.findAll({where: {technologies: { [Op.like]: '%' + term + '%' }}})
    .then(gig => {
        res.render('gigs', {
            gigs: gig
        })
    }).catch(error => console.log('Error: ' + error));
})

module.exports = router;