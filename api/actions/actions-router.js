// Write your "actions" router here!
const express = require('express');
const {
    handleError,
    checkActionId,
    checkProjectId,
    validateAction,
} = require('./actions-middlware')
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

router.get('/:id', checkActionId, (req, res, next) => {
    res.status(200).json(req.action)
});

router.post('/', checkProjectId, validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next);
});

router.put('/:id', checkActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.delete('/:id', checkActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200);
        })
        .catch(next);
})

router.use(handleError);

module.exports = router;
