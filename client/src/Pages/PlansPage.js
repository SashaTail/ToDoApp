<<<<<<< HEAD

import React, {useState, useEffect, useContext, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import { Button, Modal } from 'react-bootstrap';
=======
import React, {useState, useEffect, useContext, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f
import { useMessage } from '../hooks/message.hook'
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import Todolist from '../components/Todolist';
import Context from '../context/context';
<<<<<<< HEAD


export const PlanPage = () => {
    const [todos, settodos] = useState([''
      ])

      const [show, setShow] = useState(false);
      const auth = useContext(AuthContext)
      const {loading,request,error,  clearError} = useHttp()
      const message = useMessage()
      
      
      
      
=======
import { ModalPlan } from '../components/ModalPlan';
import Loader from 'react-loader-spinner'

export const PlanPage = () => {
    const [todos, settodos] = useState([])
      const [update, setUpdate] = useState(false)

      const auth = useContext(AuthContext)
      const {request,error,  clearError} = useHttp()
      const message = useMessage()  
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f
      const fetchPlans = useCallback(async () => {
        try {
          const fetched = await request('/api/todo', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
          })
          settodos(fetched)
        } catch (e) {}
      }, [auth.token, request])
      useEffect( ()=>{
        fetchPlans()
<<<<<<< HEAD
    },[fetchPlans])


=======
        setUpdate(false)
    },[fetchPlans,update])
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f



      function toggleToDo(id){
<<<<<<< HEAD
          console.log(todos)
          console.log(id)
=======
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f
        settodos(todos.map(todo => {
          if (todo._id === id)
          {
            todo.completed=!todo.completed
            request('/api/todo/update', 'POST', todo,{
              Authorization: `Bearer ${auth.token}`
            })
            
          }
          return todo
      }))
    }



<<<<<<< HEAD
    const [form, setForm] = useState({
        title: '', describe: ''
      })
      useEffect( () => {
        console.log(error)
        message(error)
        clearError()
    }, [error,message,clearError])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const changeHandler = event => {
        setForm ({ ...form, [event.target.name]: event.target.value})
    }


    const createHandler = async () => {
        try {
          const data = await request('/api/todo/create', 'POST', {...form},{
            Authorization: `Bearer ${auth.token}`
          })
          setShow(false)
          message(data.message)
        } catch (e) {}
      }



=======
      useEffect( () => {
        message(error)
        clearError()
    }, [error,message,clearError])

    function updateData(id){
      setUpdate(id)
    }
  
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f
      function removeToDo(id){

      todos.map(todo => {
        if (todo._id === id)
        {
          
          request('/api/todo/remove', 'POST', todo,{
            Authorization: `Bearer ${auth.token}`
          })
<<<<<<< HEAD
          console.log(todo)
=======
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f
        }
        return todo
    })
    settodos(todos.filter(todo => todo._id !== id))
  }

<<<<<<< HEAD
    
return (
  <Context.Provider value={{removeToDo}}>
<div className='jarallax-container-0' style= {{backgroundColor: "rgb(240, 240, 240)"}}>
<div className='row justify-content-center' style={{paddingTop:"2rem"}}>
<Button variant="primary" onClick={handleShow}>
    Добавить план
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{justifyContent:'center'}}>
          <Modal.Title>Добавить план</Modal.Title>
        </Modal.Header>
        <div className="input-field " style= {{paddingBottom:'1rem'}}>
                          <input 
                          placeholder="Добавьте название" 
                          id="title" 
                          class= 'form-control'
                          type="text" 
                          name='title'
                          value={form.title}
                          onChange={changeHandler}
                          />
                    </div>
                    <div className="input-field " style= {{paddingBottom:'1rem'}}>
                          <input 
                          placeholder="Добавьте описание" 
                          id="describe" 
                          class= 'form-control'
                          type="text" 
                          name='describe'
                          value={form.describe}
                          onChange={changeHandler}
                          />
                    </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={createHandler}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
    <div className = "row">
    <div className="col s8 offset-s9" style={{paddingTop: '20rem', paddingBottom:'20rem'
    }}>
    <div className=" container">
    <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
        <Todolist todos={todos} onToggle={toggleToDo}></Todolist>
        </div>
    </div>
</div>
</div>
</div>
</div>
</Context.Provider>
)
=======
  if (todos.length<1) // загрузка окна // багается когда запускается сервер и заранее окно открыто *это не фикситься*
  {
    return (
      <div style={{backgroundColor: "rgb(240, 240, 240)"}}>
        <div style={{
                display:'flex',
                flexDirection:'column',
                margin:'0 auto',
                width:'100%',
                maxWidth:'960px',
                height:'100%',
                minHeight:'830px',
                alignItems:'center',
                justifyContent:'center',
                paddingTop: '2rem',
                paddingBottom: '2rem'
            }}>
            <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
          </div>
        </div>

  )
}
return (
    <Context.Provider value={{removeToDo,updateData}}>
      <div style={{backgroundColor: "rgb(240, 240, 240)"}}>
        <div style={{
                display:'flex',
                flexDirection:'column',
                margin:'0 auto',
                width:'100%',
                maxWidth:'960px',
                height:'100%',
                minHeight:'830px',
                alignItems:'center',
                justifyContent:'center',
                paddingTop: '2rem',
                paddingBottom: '2rem'
            }}>
            <ModalPlan></ModalPlan>      
            <Todolist todos={todos} onToggle={toggleToDo}></Todolist>
        </div>
      </div>
    </Context.Provider>
  )
>>>>>>> bc605ef58ad588121a9c3dee414ad52edfc2d28f
}
