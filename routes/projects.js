var express = require('express');
var router = express.Router();

// GET: Get projects
router.get('/', function(req, res, next) {
  res.send('Get projects');
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
