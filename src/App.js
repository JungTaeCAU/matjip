import Map from './components/KakaoMap';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Detail from './pages/detail.js';
import About from './pages/about';
import Event from './pages/event';
import data from './data';
import axios from 'axios';
import MapContainer from './components/KakaoMap';
import Cart from './pages/Cart.js';

function App() {

  function Loading(){
    if(load == true){
      return(
        <div className='col-md-4'>
            <h4>로딩중입니다.</h4>
        </div>
      )
    } else{
      return null;
    }
  
  }

  let navigate = useNavigate();
  let [shoes,setShoes] = useState(data);
  let [count,setCount] = useState('');
  let [load,setLoad] = useState(false);
  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
              <img
                alt=""
                src="/img/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}맛집투어</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
        </Nav>
      </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
          <div className='main-bg'></div>
          <div className='container'>
            <div className='row'>
            {
              shoes.map((a,i)=>{
                return <Card shoes={shoes[i]} i={i} key={i}/>
              })
            }
            </div>
          </div>
            <Loading></Loading>
            <button onClick={()=>{
              switch(count) {
                case '':
                  setLoad(true);
                  setCount('1');
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((result)=>{
                    let temp = [...shoes, ...result.data];
                    setShoes(temp);
                  })
                  .catch(()=>{
                    console.log('실패함ㅅㄱ');
                  })
                  setLoad(false);
                break;
                case '1':
                  setLoad(true);
                  setCount('2');
                  axios.get('https://codingapple1.github.io/shop/data3.json')
                  .then((result)=>{
                    console.log(result.data)
                    let temp = [...shoes, ...result.data];
                    setShoes(temp);
                  })
                  .catch(()=>{
                    console.log('실패함ㅅㄱ');
                  })
                  setLoad(false);
                break;
                case '2':
                  alert('이제 없습니다.');
                break;


              }
            }}>버튼</button>
          </>
        }/>
        <Route path='/detail/:id' element={
          <>
            {
              <Detail shoes={shoes}/>
            }
          </>
        }/>
        <Route path='/about' element={<About/>}>
          <Route path='location' element={<div><MapContainer/></div>}></Route>
          
        </Route>

        <Route path='/cart' element={<Cart/>} />

      </Routes>





    </div>
  );
}

function Card(props){
  return(
      <div className='col-md-4'> 
          <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width={"80%"}></img>
          <h4>{props.shoes.title} </h4>
          <p>{props.shoes.content} </p>
      </div>
  )
}


export default App;