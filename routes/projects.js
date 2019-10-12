var express = require('express');
var router = express.Router();

const projects = [
  {
    title: 'Project 1',
    id: 1
  },
  {
    title: 'Project 2',
    id: 2
  },
  {
    title: 'Project 3',
    id: 3
  }
]

// GET: Get projects
router.get('/', function(req, res, next) {
  res.send(projects);
});

// GET: Get a project
router.get('/:id', function(req, res, next) {
  res.send(projects.filter(project => project.id == req.params.id));
});

// POST: Create a project
// router.post('/', function (req, res) {
//   res.send('Create a project');
// });

// PUT: Update a project
// router.put('/projects', function (req, res) {
//   res.send('Update a project');
// });

// DELETE: Delete a project
// router.delete('/projects', function (req, res) {
//   res.send('Delete a project');
// });

module.exports = router;
