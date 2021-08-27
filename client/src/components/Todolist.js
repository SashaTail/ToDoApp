import React from 'react'
import TodoItem from './Todoitem'
import PropTypes from 'prop-types'

const style =
{
    ul:{
        listStyle: 'none'
    }
}

function Todolist(props)
{
    

    return (
        <ul style={style.ul}>
        {props.todos.map((todo,index) => {
            return <TodoItem todo={todo} key={todo._id} index={index} onChange={props.onToggle}></TodoItem>
        })}
        </ul>
    )
}

Todolist.propstype= {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default Todolist 