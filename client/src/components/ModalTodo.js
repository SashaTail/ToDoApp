import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap';;


export const ModalTodo = ({item, todo}) => {


    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    useEffect( ()=>{
        setShow(item)
    },[item])
return ( 
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{todo.title}</Modal.Title>
    </Modal.Header>
    {todo.describe.length>1 ?<Modal.Body><span style={{wordBreak:'break-word'}}>{todo.describe}</span></Modal.Body>:<Modal.Body>Тут ничего нет</Modal.Body>}
    <p style={{fontSize:'8px', color:"gray"}}>{todo.date.substr(0,10)}</p>
    <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                <Button variant="primary" >
                Сохранить
                </Button>
          </Modal.Footer>
  </Modal>)
}
export default ModalTodo