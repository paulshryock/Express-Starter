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
  // Validate project
  const { error } = validate(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

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
  // Check if project exists
  const project = projects.find(a => a.id === parseInt(req.params.id));
  if (!project) res.status(404).send('"id" was not found')

  // Validate project
  const { error } = validateArticle(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

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
// router.delete('/projects', function (req, res) {
//   res.send('Delete a project');
// });

function validate(project) {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  return schema.validate(project)
}

module.exports = router;
