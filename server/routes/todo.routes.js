const config = require('config')
const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
/*const Todo = require('../models/Todo')*/

const {Todo, TodoId, User}=require('../models/models')
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
        const todo = Todo.create(obj) 
        const data = await Todo.findByPk((await todo).getDataValue('id'))
        res.status(201).json({todo:data,message: "Запланировано"})
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
        console.log(e)
        
    }

})


router.get('/', auth ,async (req,res) => {
    try 
    {
        console.log(req.query.completed)
        const todos = await Todo.findAll({where: 
            {userId: req.user.userId, completed: req.query.completed}})
        res.json(todos)
    } 
    
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})






router.post('/update',auth, async (req,res) => {
    try 
    {    
        console.log('1')
        Todo.update(
            // Values to update
            {
                completed:  req.body.completed 
            },
            { // Clause
                where: 
                {
                    id: req.body.id
                }
            }
        ).then(count => {
            console.log('Rows updated ' + count);
        });

    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})

router.post('/remove',auth, async (req,res) => {
    try 
    {
        const todos = await Todo.destroy({where: {id: req.body.id}})
        console.log(todos)
        res.json(todos)
        
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})




module.exports = router