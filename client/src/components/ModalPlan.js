import React, {useState, useEffect, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import { Button, Modal } from 'react-bootstrap';
import { useMessage } from '../hooks/message.hook'
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import Context from '../context/context';


export const ModalPlan = () => {
      const [show, setShow] = useState(false);
      const auth = useContext(AuthContext)
      const {request,error,  clearError} = useHttp()
      const message = useMessage()
      const {updateData}= useContext(Context)

    const [form, setForm] = useState({
        title: '', describe: ''
      })
      useEffect( () => {
        message(error)
        clearError()
    }, [error,message,clearError])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const changeHandler = event => {
        setForm ({ ...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
          const data = await request('/api/todo/create', 'POST', {...form},{
            Authorization: `Bearer ${auth.token}`
          })
          setShow(false)
          console.log(data.message)
          message(data.message)
        } catch (e) {}
      }


    
return (
<div className='jarallax-container-0' style= {{backgroundColor: "rgb(240, 240, 240)"}}>
    <div className='row justify-content-center' style={{paddingTop:"2rem"}}>
        <Button variant="primary" onClick={handleShow}>Добавить план</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{justifyContent:'center'}}>
                <Modal.Title>Добавить план</Modal.Title>
            </Modal.Header>
            <div className="input-field " style= {{paddingBottom:'1rem'}}>
                <input 
                placeholder="Добавьте название" 
                id="title" 
                className= 'form-control'
                type="text" 
                name='title'
                value={form.title}
                onChange={changeHandler}
                />
            </div>
            <div className="input-field " style= {{paddingBottom:'1rem'}}>
                <input 
                placeholder="Добавьте описание" 
                id="describe" 
                className= 'form-control'
                type="text" 
                name='describe'
                value={form.describe}
                onChange={changeHandler}
                />
            </div>
          <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                <Button variant="primary" 
                onClick={createHandler} 
                onClickCapture={updateData.bind(null,true)}>
                Сохранить
                </Button>
          </Modal.Footer>
        </Modal>
    </div>
</div>
)
}
export default ModalPlan