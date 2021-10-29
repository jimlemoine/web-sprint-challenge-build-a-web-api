// Write your "projects" router here!
const express = require('express');
const {
    handleError,
    checkProjectId,
    validateProject,
} = require('./projects-middleware')
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
});

router.get('/:id', checkProjectId, (req, res, next) => {
    res.status(200).json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
});

router.put('/:id', validateProject, checkProjectId, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

router.delete('/:id', checkProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200);
        })
        .catch(next);
})

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})

router.use(handleError);

module.exports = router;