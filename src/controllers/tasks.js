const Task = require('../models/Task')

const Controller = {

    async get(req, res) {
        const tasks = await Task.find();
        return res.json(tasks);
    },

    async save(req, res) {
        const task = new Task(req.body)
        await task.save();
        res.json({
            status: 'Task Saved',
            task: task,
        })
    },

    async update(req, res) {
        const {
            id
        } = req.params;

        await Task.findByIdAndUpdate({
            _id: id
        }, req.body)
        res.json({
            status: 'Task Updated'
        })
    },

    async delete(req, res) {
        const {
            id
        } = req.params;

        await Task.findByIdAndDelete({
            _id: id
        }, req.body)
        res.json({
            status: 'Task Deleted'
        })
    }

}

module.exports = Controller