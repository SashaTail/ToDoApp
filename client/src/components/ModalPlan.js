import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { Button, Modal } from 'react-bootstrap';
import '../App.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { addTodos } from '../redux/actions/todo';
import {  useToasts } from 'react-toast-notifications';





export const ModalPlan = () => {
  
    const dispatch = useDispatch()
      const [show, setShow] = useState(false);
      const auth = useContext(AuthContext)
      const {request,error,  clearError} = useHttp()

      const { addToast } = useToasts();
      const dateChanged = day => form.date=day;
      var dt = new Date();
    const [form, setForm] = useState({
        title: '', describe: '', date: dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate(),
      })
      useEffect( () => {
        console.log(error)
        clearError()
    }, [error,clearError])
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
          dispatch(addTodos(data.todo)) // добавление загруженного массива из бд*ошибка при которой не работало edit_todo, remove_to
          addToast(data.message, { appearance: 'success' });
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
                onClick={createHandler}>
                Сохранить
                </Button>
          </Modal.Footer>
        </Modal>
        </div>
)
}
export default ModalPlan