const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todos_count = await getAsync("added_todos")
  await setAsync("added_todos", Number(todos_count) +1)
  console.log(todos_count, await getAsync("added_todos"))
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});



const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); 
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  
  const todo = {
    text: req.body.text,
    done: req.body.done,
  }

  const updated = await Todo.findByIdAndUpdate(req.todo.id, todo, { new: true })
  res.json(updated)

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
