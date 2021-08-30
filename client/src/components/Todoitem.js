import PropTypes from 'prop-types'
import React, {useState,useContext} from 'react';
import Context from '../context/context'
import ModalTodo from './ModalTodo';




function TodoItem({todo, index, onChange})  {
    const {removeToDo}= useContext(Context)
    const classes = []
    if (todo.completed) {
        classes.push('done')
    }
    const [info, setInfo] = useState(false)
    const fuck= () =>
    {
        setInfo(true)
    }
    const [hovered, setHovered] = useState(false)

    return (
    <div onMouseMove={() => setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        {hovered ?
        (
        <li style={{display:'flex',flexDirection:'row',border:'1px solid blue', borderRadius:'4px', marginBottom:'3px' ,alignItems: 'center', justifyContent:'space-between', cursor:'pointer', backgroundColor:'whitesmoke'}}>
            <div style={{display:'flex'}}>
                <input type='checkbox' 
                checked={todo.completed}
                style={{margin:'1rem'}}
                onChange={()=> onChange(todo._id)}/> 
                <span className={classes.join('')} style={{wordBreak:'break-word'}}>
                    <div style={{display:'flex',marginTop:'0.6rem'}} onClick={fuck}>
                        <p style={{paddingRight:'2px'}}><strong>{index+1}</strong></p>
                        <p>{todo.title}</p>
                    </div>
                </span>
            </div>
            <button style={{borderRadius:'10px'}} onClick = {removeToDo.bind(null,todo._id)}>✘</button>
        </li>
        ) : 
        (
        <li style={{display:'flex',flexDirection:'row',border:'1px solid black', borderRadius:'4px', marginBottom:'3px' ,alignItems: 'center', justifyContent:'space-between', cursor:'pointer'}}>
            <div style={{display:'flex'}}>
                <input type='checkbox' 
                checked={todo.completed}
                style={{margin:'1rem'}}
                onChange={()=> onChange(todo._id)}/> 
                <span className={classes.join('')} style={{wordBreak:'break-word'}}>
                    <div style={{display:'flex',marginTop:'0.6rem'}}>
                        <p style={{paddingRight:'2px'}}><strong>{index+1}</strong></p>
                        <p>{todo.title}</p>
                    </div>
                </span>
            </div>
            <button style={{borderRadius:'10px'}}onClick = {removeToDo.bind(null,todo._id)}>✘</button>
        </li>)}
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