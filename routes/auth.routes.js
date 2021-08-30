const {Router} = require("express")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config');
const {check, validationResult} = require('express-validator')
const User= require("../models/user");
const auth = require("../middleware/auth.middleware");

const router = Router()

router.get('/check', auth ,async (req,res) => {
    try 
    {
        console.log(req.user.userId)
        const token = jwt.sign(
            {userId: req.user.userId},
            config.get("jwtsecret"),
            {expiresIn: '24h'}
             ) 
             res.json({token, userId: req.user.userId})
    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }

})

// reg  
router.post('/register',
[
    check('password','Минимальная длина пароля 6 символов').isLength({min:6})
],
async (req,res) => {
    try 
    {   
        const errors = validationResult(req)
        if (!errors.isEmpty())
        {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }
        const {username,password} = req.body
        const candidate = await User.findOne({username})
        if (candidate){
           return res.status(400).json({message: "Такой пользователь уже существует"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({username,password: hashedPassword })
        await newUser.save()
        res.status(201).json({message:"Пользователь создан"})

    } 
    catch (e) {
        res.status(500).json({message: "Что то пошло не так:("})
    }
})

// login
router.post('/login', 
[
    check('user','Введите логин').exists(),
    check('password','Введите пароль').exists()
],
async (req,res) => {
    try {
        
    
    const errors = validationResult(req)

        if (!errors.isEmpty)
        {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при входе"
            })
        }
        const {username,password} = req.body
        const user = await User.findOne({username})
        if (!user)
        {
            return res.status(400).json({message: "Пользователь не найден"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({message: "Неверно введены данные"})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtsecret"),
            {expiresIn: '24h'}
             )
            res.json({token, userId: user.id})
    }
    catch (e) {
        
    }
})




module.exports = router