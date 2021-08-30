import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { Button, Modal } from 'react-bootstrap';
import { useMessage } from '../hooks/message.hook';
import '../App.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { AuthContext } from '../context/AuthContext';
import Context from '../context/context';



export const ModalPlan = () => {
      const [show, setShow] = useState(false);
      const auth = useContext(AuthContext)
      const {request,error,  clearError} = useHttp()
      const message = useMessage()
      const {updateData}= useContext(Context)
      const dateChanged = day => form.date=day;
      var dt = new Date();
    const [form, setForm] = useState({
        title: '', describe: '', date: dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate(),
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
          form.title=''
          form.describe=''
          form.date=dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        } catch (e) {}
      }

    
return (
  <div>
        <Button variant="primary" style={{marginBottom:'1rem'}} onClick={handleShow}>Добавить план</Button>

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
                <textarea 
                placeholder="Добавьте описание" 
                id="describe" 
                className= 'form-control'
                type="text" 
                name='describe'
                value={form.describe}
                onChange={changeHandler}
                />
            </div>
            <div style={{paddingBottom:'1rem', width:'100%', justifyContent:'center', alignContent:'center'}}>
              <DayPickerInput 
              value={form.date}
              onDayChange={day => dateChanged(day)}
              inputProps={{
                  onChange: event => dateChanged(event.target.value),
                }}
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
)
}
export default ModalPlan