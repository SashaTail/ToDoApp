import React, {useState, useEffect, useContext, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import { Button, Modal } from 'react-bootstrap';
import { useMessage } from '../hooks/message.hook'
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import Todolist from '../components/Todolist';
import Context from '../context/context';
import { ModalPlan } from '../components/ModalPlan';


export const PlanPage = () => {
    const [todos, settodos] = useState([''
      ])
      const [update, setUpdate] = useState(false)

      const auth = useContext(AuthContext)
      const {loading,request,error,  clearError} = useHttp()
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
          console.log(todos)
          console.log(id)
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
        console.log(error)
        message(error)
        clearError()
    }, [error,message,clearError])


    function updateData(id){
      console.log("update" + id)
      setUpdate(id)
    }
  
      function removeToDo(id){

      todos.map(todo => {
        if (todo._id === id)
        {
          
          request('/api/todo/remove', 'POST', todo,{
            Authorization: `Bearer ${auth.token}`
          })
          console.log(todo)
        }
        return todo
    })
    settodos(todos.filter(todo => todo._id !== id))
  }

    
return (
<Context.Provider value={{removeToDo,updateData}}>
  <div className='jarallax-container-0' style= {{backgroundColor: "rgb(240, 240, 240)"}}>
    <div className='row justify-content-center' style={{paddingTop:"2rem"}}>
      <ModalPlan></ModalPlan>
    </div>
        <div className = "row">
          <div className="col s8 offset-s9" style={{paddingTop: '20rem', paddingBottom:'20rem'}}>
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
}
