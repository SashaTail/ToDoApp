
import React from 'react'
import { Button } from 'react-bootstrap';
import '../App.css';

export const StartPage = () => {
return (
<div style={{backgroundColor: "rgb(240, 240, 240)"}}>
    <div style={{
        display:'flex',
        flexDirection:'row',
        margin:'0 auto',
        width:'100%',
        maxWidth:'960px',
        height:'100%',
        minHeight:'830px',
        alignItems:'center',
        justifyContent:'center',
        paddingTop: '2rem',
        paddingBottom: '2rem'
    }}>
        <div style={{alignContent:'center'}}>
            <h1 style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                lineHeight: '1.2',
                fontWeight:400,
                fontSize:'6rem',
                marginBottom:'-1rem',
                textAlign:'left',
                color:'black',
            }}>Список твоих <br/> дел</h1>
            <p style = {{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                lineHeight: '1.2',
                fontWeight:400,
                fontSize:'1rem',
                marginTop:'1rem',
                textAlign:'left',
                color:'black'
            }} >Просто как никогда.</p>
            <div className='row justify-content-center'>
                <Button href='/auth'>Начать</Button>
            </div>
        </div>
    </div>
</div>
)
}
