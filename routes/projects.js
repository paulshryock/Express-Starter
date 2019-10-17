const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

// TODO: Replace this with real database code
const projects = [
  {
    id: 1,
    title: 'Hello World'
  },
  {
    id: 2,
    title: 'All Around the World'
  },
  {
    id: 3,
    title: 'The World is a Vampire'
  }
]

/**
 * Get projects
 */
router.get('/', function(req, res, next) {
  // Sort projects
  const sortBy = req.query.sortBy
  if (sortBy) projects.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

  // Return projects to the client
  res.send(projects);
});

/**
 * Get a project
 */
router.get('/:id', function(req, res, next) {
  // Check if project exists
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).send('"id" was not found')

  // Return project to the client
  res.send(project)
});

/**
 * Create a project
 */
router.post('/', function (req, res) {
  // Auth

  // Validate project
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Create project
  const project = {
    // TODO: Set id in database
    id: projects.length + 1,
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
router.put('/:id', function (req, res) {
  // Auth

  // Check if project exists
  const project = projects.find(a => a.id === parseInt(req.params.id));
  if (!project) return res.status(404).send('"id" was not found')

  // Validate project
  const { error } = validateArticle(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Update project
  project.title = req.body.title

  // Update project in the database
  // TODO: Replace this with real database code
  projects[project.id - 1] = project

  // Return updated project to client
  res.send(project)
});

/**
 * Delete a project
 */
router.delete('/:id', function (req, res) {
  // Auth

  // Check if project exists
  const project = projects.find(a => a.id === parseInt(req.params.id));
  if (!project) return res.status(404).send('"id" was not found')

  // Delete project from the database
  // TODO: Replace this with real database code
  const index = projects.indexOf(project)
  projects.splice(index, 1)

  // Return deleted project to client
  res.send(project)
});

function validate(project) {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  return schema.validate(project)
}

module.exports = router;
