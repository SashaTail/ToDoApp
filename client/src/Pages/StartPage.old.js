
import React from 'react'
import { Button } from 'react-bootstrap';
import '../App.css';

export const StartPage = () => {
return (
<div style= {{backgroundColor: "rgb(240, 240, 240)", maxHeight:'830px'}}>
    <div className = "row">
    <div className="col s8 offset-s9" style={{paddingTop: '20rem', paddingBottom:'20rem', width:'auto', maxHeight:"816px"}}>
    <div className=" container">
    <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
            <h1 className="display-1"><strong>Список твоих дел</strong></h1>
            <p className="display-7">Просто как никогда.</p>
            <div className='row justify-content-center'>
            <Button href='/auth'>Начать</Button>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
)
}
