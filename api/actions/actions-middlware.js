// add middlewares here related to actions
const Action = require('./actions-model');
const Project = require('../projects/projects-model')

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: 'we have an error!'
    })
}

function checkActionId(req, res, next) {
    Action.get(req.params.id)
        .then(possibleAction => {
            if (possibleAction) {
                req.action = possibleAction;
                next();
            } else {
                next({ status: 404, message: 'action not found!' });
            }
        })
        .catch(next);
}

function checkProjectId(req, res, next) {
    const { project_id } = req.body;
    Project.get(project_id)
        .then(possibleProject => {
            if (possibleProject) {
                req.project = possibleProject;
                next();
            } else {
                next({ status: 404, message: 'project not found' });
            }
        })
}

function validateAction(req, res, next) {
    const { name, description } = req.body;
    if (!project_id || !name.trim() || !description || !description.trim()) {
        res.status(400).json({ message: 'name and description are required!'});
    } else {
        next();
    }
}

module.exports = {
    handleError,
    checkActionId,
    checkProjectId,
    validateAction
}