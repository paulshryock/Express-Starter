const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
const projects = [
  {
    id: 1,
    title: 'Project 1'
  },
  {
    id: 2,
    title: 'Project 2'
  },
  {
    id: 3,
    title: 'Project 3'
  }
]

/**
 * Get projects
 */
router.get('/', function(req, res, next) {
  // Return projects to the client
  res.send(projects);
});

/**
 * Get a project
 */
router.get('/:id', function(req, res, next) {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) res.status(404).send('"id" was not found')

  // Return project to the client
  res.send(project)
});

/**
 * Create a project
 */
router.post('/', function (req, res) {
  // Check if project already exists
  const projectExists = projects.find(p => p.id === parseInt(req.body.id))

  if (projectExists) {
    res.status(400).send('"id" already exists')
    return
  }

  // Validate project
  const schema = Joi.object({
    id: Joi.number()
      .required(),

    title: Joi.string()
      .required()
  })

  const { error, value } = schema.validate(req.body)

  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Define project
  const project = {
    id: req.body.id,
    title: req.body.title
  }

  // Add project to the database
  // TODO: Replace this with real database code
  projects.push(project)

  // Return project to the client
  res.send(project)
});

/**
 * Update a project
 */
// router.put('/projects', function (req, res) {
//   res.send('Update a project');
// });

/**
 * Delete a project
 */
// router.delete('/projects', function (req, res) {
//   res.send('Delete a project');
// });

module.exports = router;
