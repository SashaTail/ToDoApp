const config = require('config')
const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
/*const Todo = require('../models/Todo')*/

const {Todo, TodoId}=require('../models/models')
const router = Router()

router.post('/create',auth, async (req,res) => {
    try 
    {
        const obj = {
            title: req.body.title,
            describe: req.body.describe, 
            date: req.body.date, 
            userId: req.user.userId  
        }
        const todo = await Todo.create(obj)
        console.log("todo info " + todo)
       // const id = TodoId.create({userId:req.user.userId})
        //console.log(obj)
        /*const todo = new Todo({
            title: req.body.title,
            describe: req.body.describe, 
            date: req.body.date,  
            owner: req.user.userId  
        })
        await todo.save()*/
        res.status(201).json({todo:todo,message: "Запланировано"})
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
        
    }

})


router.get('/', auth ,async (req,res) => {
    try 
    {
        console.log('there')
        const todos = await Todo.findAll({where: 
            {userId: req.user.userId}})
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


router.post('/update',auth, async (req,res) => {
    try 
    {   
        const todos = await Todo.findByIdAndUpdate(req.body._id, { completed: req.body.completed })
        res.json(todos)

    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})

router.post('/remove',auth, async (req,res) => {
    try 
    {
        const todos = await Todo.findByIdAndRemove(req.body._id)
        res.json(todos)
        
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})




module.exports = router