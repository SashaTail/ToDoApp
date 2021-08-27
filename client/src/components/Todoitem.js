
import PropTypes from 'prop-types'
import { useContext } from 'react'
import Context from '../context/context'


const style={
    li:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem .1rem',
        border: '1px solid #ccc',
        borderRadius:'4px',
        marginBottom: '.5rem'
    },

    input:
    {
        marginRight:'1rem',
    }
}   


function TodoItem({todo, index, onChange})  {
    const {removeToDo}= useContext(Context)
    const classes = []
    if (todo.completed) {
        classes.push('done')
    }


    return (
        <li style={style.li}>
        <span className={classes.join('')}>
        <input type='checkbox' 
        checked={todo.completed}
        style={style.input}
        onChange={()=> onChange(todo._id)}> 
        </input>

        <strong>{index+1} </strong>
        {todo.title}
        </span>

        <button 
        onClick = {removeToDo.bind(null,todo._id)}>
        X</button>
        </li>
    )
}


TodoItem.propstype= {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired,
}

export default TodoItem