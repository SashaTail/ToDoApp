import React, {useState, useEffect, useContext, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import Todolist from '../components/Todolist';
import Context from '../context/context';
import { ModalPlan } from '../components/ModalPlan';
import Loader from 'react-loader-spinner'

export const PlanPage = () => {
    const [todos, settodos] = useState([])
      const [update, setUpdate] = useState(false)

      const auth = useContext(AuthContext)
      const {request,error,  clearError} = useHttp()
      const message = useMessage()  
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
        setUpdate(false)
    },[fetchPlans,update])



      function toggleToDo(id){
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



      useEffect( () => {
        message(error)
        clearError()
    }, [error,message,clearError])

    function updateData(id){
      setUpdate(id)
    }
  
      function removeToDo(id){

      todos.map(todo => {
        if (todo._id === id)
        {
          
          request('/api/todo/remove', 'POST', todo,{
            Authorization: `Bearer ${auth.token}`
          })
        }
        return todo
    })
    settodos(todos.filter(todo => todo._id !== id))
  }

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
}
