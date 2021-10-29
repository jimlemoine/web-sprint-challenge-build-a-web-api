const Project = require('./projects-model');

function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: 'we have an error!'
    })
}

function checkProjectId(req, res, next) {
    Project.get(req.params.id)
        .then(possibleProject => {
            if (possibleProject) {
                req.project = possibleProject;
                next();
            } else {
                next({ status: 404, message: 'project not found!' });
            }
        })
        .catch(next);
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !name.trim() || !description || !description.trim() || completed === undefined) {
        res.status(400).json({ message: 'name and description and completed status are required!'});
    } else {
        next();
    }
}

module.exports = {
    handleError,
    checkProjectId,
    validateProject
}
