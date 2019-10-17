const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi')

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
  if (!project) res.status(404).send('The project with the given ID was not found.')

  // Return project to the client
  res.send(project)
});

/**
 * Create a project
 */
// router.post('/', function (req, res) {
//   res.send('Create a project');
// });

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
