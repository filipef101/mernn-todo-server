const router = require("express").Router();
const auth = require("../middleware/auth");
const Project = require("../models/projectModel");
const Todo = require("../models/todoModel");

router.post('/', auth, async (req, res) => {
  console.log(req.body)
  const {todo, project} = req.body
  if (!todo || !project) return res.status(400) // should validate project exists?
  const task = new Todo({
    owner: req.userid,
    project,
    todo
  })

  task.save().then(async () => {
    const p = await Project.findById(project)
    console.log(p)
    p.tasks.push(task)
    p.save()
      return res.status(200).json(task.toObject())
  })
  .catch(error => {
      console.log('error',error)
      return res.status(400).json({
          error,
      })
  })
})

router.delete('/:id', auth, async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  if (!req.params.id) return res.status(400)
  //finished must be null because its not allowed to delete finished tasks
  Todo.findOneAndDelete({_id: req.params.id, owner: req.userid, finished: null}).then(() => {
      return res.status(200).json({success: true})
  })
  .catch(error => {
      return res.status(400).json({
          error,
      })
  })
})

router.patch('/', auth, async (req, res) => {
  console.log(req.body)
  if (!req.body.id) return res.status(400)

  let updateParams = {}
  if (req.body.todo) updateParams.todo = req.body.todo
  if (req.body.finished !== undefined) updateParams.finished = req.body.finished

  //finished at null so that a finished task cannot be edited 
  Todo.findOneAndUpdate({_id: req.body.id, owner: req.userid, finished: null}, updateParams).then(() => {
      console.log('ok')
      return res.status(200).json({
          success: true,
      })
  })
  .catch(error => {
      console.error(error)
      return res.status(400).json({
          error,
      })
  })
})


module.exports = router;
