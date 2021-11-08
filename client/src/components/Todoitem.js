import PropTypes from 'prop-types'
import React, {useState,useContext, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { editTodo, removeTodos } from '../redux/actions/todo';
import ModalTodo from './ModalTodo';

const style = {
    style1:
    {
        display:'flex',
        flexDirection:'row',
        border:'1px solid blue ', 
        borderRadius:'4px', 
        
        minHeight:'50px',
        padding:'2px',
        alignItems: 'center', 
        marginBottom:'3px',
        minWidth:"500px",
        justifyContent:'space-between', 
        cursor:'pointer', 
        backgroundColor:'whitesmoke'
    },
    style2:
    {
        display:'flex',
        flexDirection:'row',
        border:'1px solid black ', 
        borderRadius:'4px', 
        marginBottom:'3px' ,
        alignItems: 'center',
        padding:'2px',
        minHeight:'50px',
        minWidth:"500px",
        justifyContent:'space-between', 
        cursor:'pointer', 
        backgroundColor:'whitesmoke'
    }
}

function TodoItem({todo, index, onChange})  {

    const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    const classes = []
    const {request} = useHttp()
    if (todo.completed) {
        classes.push('done')
    }
    const [info, setInfo] = useState(false)
    const fuck= () =>
    {
        setInfo(true)

        setTimeout(() => {
            setInfo(false)
          }, 3000);
    }
    const [hovered, setHovered] = useState(false)
    const changeHandler = (it) =>
    {
        const obj= {
            id: it.id,
            value: !it.completed
        }
        dispatch(editTodo(obj))
        request('/api/todo/update', 'POST', it,{
            Authorization: `Bearer ${auth.token}`
            })
        
    }
    const remove = useCallback(async (it) => {
        try {
            const obj = it.id
            await request('/api/todo/remove', 'POST', it,{
            Authorization: `Bearer ${auth.token}`
            })
            dispatch(removeTodos(obj))
    
        } catch (e) {}
      }, [auth.token, request,dispatch])

    const removeHandler = (it) =>
    {
        remove(it)
        
    }
    return (
    <div onMouseMove={() => setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        <li style={hovered ? (style.style1) : (style.style2)}>
            <div style={{display:'flex'}}>
                <input type='checkbox' 
                checked={todo.completed}
                style={{margin:'1rem'}}
                onChange={()=> changeHandler(todo)}/> 
                <span className={classes.join('')} style={{wordBreak:'break-word'}}>
                    <div style={{display:'flex',marginTop:'0.6rem', alignContent:'center', justifyContent:'center'}} onClick={fuck}>
                        <p style={{paddingRight:'2px'}}><strong>{index+1}</strong></p>
                        <p>{todo.title}</p>
                    </div>
                </span>
            </div>
            <button style={{borderRadius:'10px'}} onClick={() => removeHandler(todo)}>✘</button>
        </li>
        <ModalTodo item={info} todo={todo}></ModalTodo> 
    </div>
    )
}


TodoItem.propstype= {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired,
}

export default TodoItem