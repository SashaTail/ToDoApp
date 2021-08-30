import PropTypes from 'prop-types'
import React, {useState,useContext} from 'react';
import Context from '../context/context'
import { Modal } from 'react-bootstrap';

let style={
    li:
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem .1rem',
        border: '1px solid #ccc',
        borderRadius:'4px',
        marginBottom: '.5rem',
        cursor:'pointer',
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
    
    const [show, setShow] = useState(false);
    const handleClose = () => 
    {
        setShow(false)
        
    };
  const handleShow = () => setShow(true);


    return (
        
        <li style={style.li} onClick={handleShow}>
            <span className={classes.join('')}>
                <input type='checkbox' 
                checked={todo.completed}
                style={style.input}
                onChange={()=> onChange(todo._id)}> 
                </input>
                <strong  onClick={handleShow}>{index+1} </strong>
                {todo.title}
            </span>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{todo.title}</Modal.Title>
        </Modal.Header>
        {todo.describe.length>1 ?<Modal.Body><span style={{wordBreak:'break-word'}}>{todo.describe}</span></Modal.Body>:<Modal.Body>Тут ничего нет</Modal.Body>}
        <Modal.Footer>
        <strong>Чтобы закрыть нажмите ESC</strong>
        </Modal.Footer>
      </Modal>
      <button 
        onClick = {removeToDo.bind(null,todo._id)}>
        ✘</button>
        </li>
    )
}


TodoItem.propstype= {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired,
}

export default TodoItem