const config = require('config')
const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Todo = require('../models/Todo')
const router = Router()

router.post('/create',auth, async (req,res) => {
    try 
    {
        const todo = new Todo({
            title: req.body.title,
            describe: req.body.describe, 
            date: Date.now().toString(), owner: req.user.userId  //// Подумай над датой
        })
        await todo.save()
        res.status(201).json({message: "Запланировано"})
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
        
    }

})


router.get('/', auth ,async (req,res) => {
    try 
    {
        const todos = await Todo.find({ owner: req.user.userId}) 
        res.json(todos)
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})

router.get('/:id',auth, async (req,res) => {
    try 
    {
        const todos = await Todo.findById(req.params.id)
        res.json(todos)

    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})

module.exports = router