import React, { useCallback, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodos, editTodo, removeTodos, setTodos } from '../redux/actions/todo'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'


export const TestPage = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()

    const auth = useContext(AuthContext)
    const message = 'lol'


    const fetchPlans = useCallback(async () => {
        try {
          let test=false
          const fetched = await request(`/api/todo?completed=${test}`, 'GET', null, {
            Authorization: `Bearer ${auth.token}`
          })
          dispatch((setTodos(fetched)))
    
        } catch (e) {}
      }, [auth.token, request,dispatch])
    
    
      useEffect( ()=>{
        fetchPlans()
      },[fetchPlans])


    const {todos} = useSelector(({todos})=>{
        return {
          todos: todos.items
        }
    
      })
      console.log(todos)
      const addClick= ()=>{
          let obj={_id:3,title:'test', describe:'new'}
          dispatch(addTodos(obj))
      }
      const removeClick= (it) => {
        console.log(it._id)
        dispatch(removeTodos(it._id))

      }


      const editClick= (it) => {
        const obj= {id: it.todo._id, value: it.message}

        dispatch(editTodo(obj))

      }
    return ( 
    <div>
    {todos.map((todo)=>{return <div style={{display:'flex', flexDirection:'colomn'}}>
    <p>{todo.title}</p>
    <div>
    <button onClick={() => removeClick(todo)}>Deleteme</button>
    <button onClick={() => editClick({todo,message})}>Изменить</button>
    </div>
    </div>})}
    <button onClick={addClick}>test</button>
    </div>)
}