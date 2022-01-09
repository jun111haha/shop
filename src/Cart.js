import React, { useState, useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";

function Cart(props) {

  function buttonClick() {
    
  }

  let state = useSelector((state) => state); // 리덕스를 더 쉽게 사용하는 방법.

  console.log(state.reducer2);
  let dispatch = useDispatch(); // 디스패치를 더 쉽게 사용하는 방법

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.reducer.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량증가", payload: a.id });
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량감소", payload: a.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {state.reducer2 === true ? (
        <div className="my-alert2">
          <p>지금 구매 하시면 신규할인 20%</p>
          <button
            onClick={() => {
              dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}

    <Parent name = 'kangjun2' age = '20'/>

    </div>
  );
}

// function 함수명(state) {
//   console.log(state);
//     return{
//         state : state.reducer,
//         alert열렸니 : state.reducer2
//     }
// } //state 를 props 화 reducer 가 2개이상이면 이 함수도 바뀜

// export default connect(함수명)(Cart) // Redux 쓰는방법 셋팅

function Parent(props){
  return (
    <div>
      <Child1 name = {props.name}/>
      <Child2 age = {props.age}/> 
    </div>
  )
}
function Child1(){
  useEffect( ()=>{ console.log('렌더링됨1') } );
  return <div>1111</div>
}
let Child2 = memo (function(){
  useEffect( ()=>{ console.log('렌더링됨2') } );
  return <div>2222</div>
}); // memo 로 감싸진 함수는 컴포넌트와 관련된 props 가 변경될때마다 재렌더링됨. 기존props vs 바뀐props
//비교 연산후 컴포넌트 업데이트할지 말지 결정한다.

export default Cart;
