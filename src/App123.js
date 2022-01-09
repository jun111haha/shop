/* eslint-disable */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '익산 우동 맛집', '리액트 독학']);
  let [따봉, 따봉변경] = useState([0,0,0]); //따봉 0 저장 따봉변경() 으로 변경

  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);

  let[입력값, 입력값변경] = useState('');


  let posts = '강남 고기 맛집';

  function 제목바꾸기(){
    var newArray = [...글제목];
    newArray[0] = '익산 우동 맛집';
    newArray[1] = '남자 코트 추천';
    newArray[2] = '리액트 독학';

    글제목변경 ( newArray );
  }

  return (

    
    <div className="App">
      <div className="black-nav">
         <div>개발 Blog</div>
      </div>



    {
      
      글제목.map(function(i,a){
        return(
          <div className='list' key={a} >
          <h3 onClick={ ()=> { 누른제목변경(a) } }> {i} <span onClick={ ()=> {
            let copy = [...따봉]; 
            copy[a]++; 
            따봉변경(copy)
          }}>👍</span> {따봉[a]}  </h3>
           <p>6월 5일 발행</p>
           <hr/>
        </div>
        )
      })
    }


    <div className="publish">
      <input onChange={ (e)=>{입력값변경(e.target.value)} }></input>
      <button onClick={ ()=>{
        var arrayCopy = [...글제목];
        arrayCopy.unshift(입력값);
        글제목변경( arrayCopy );
      } }>저장</button>
    </div>



   <button onClick  = { () => { modal변경( !modal) } }> 열고닫기 </button>

     {
       
       modal == true
        ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal>
        : null

     }

    </div>

  );
}

function Modal(props) {
  return (
    <div className= "modal">
      <h2>{ props.글제목[props.누른제목] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}



export default App;
