import React, {useState, useEffect, useContext, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import Todolist from '../components/Todolist';
import { ModalPlan } from '../components/ModalPlan';
import Loader from 'react-loader-spinner'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux'
import { setTodos } from '../redux/actions/todo';



export const PlanPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(({todos})=>{
    return {
      todos: todos.items
    }

  })

  const [completed, setCompleted] = useState(true)
  const auth = useContext(AuthContext)
  const {request,error, loading, clearError} = useHttp() 
  const fetchPlans = useCallback(async () => {
    try {
      let test=!completed
      const fetched = await request(`/api/todo?completed=${test}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      dispatch((setTodos(fetched)))

    } catch (e) {}
  }, [auth.token, request,dispatch,completed])


  useEffect( ()=>{
    fetchPlans()
  },[fetchPlans])

  useEffect( () => { //проверка ошибок
    console.log(error)
    clearError()
    }, [error,clearError])

  
  if (loading) 
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
                paddingBottom: '9rem'
            }}>
            
            {completed ?
            (<Button onClick={()=> setCompleted(false)} style={{marginTop:'1rem', marginBottom:'1rem'}}>Выполненные</Button>)
            : (<Button onClick={()=> setCompleted(true)} style={{marginTop:'1rem', marginBottom:'1rem'}} >Невыполненные</Button>)}
            <ModalPlan></ModalPlan>   
            <Todolist todos={items.todos}></Todolist>   
        </div>
      </div>
  )
}