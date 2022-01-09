import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Jumbotron,
  Button,
} from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import RecentInfo from "./RecentInfo.js";
import { 재고context } from "./App.js"; // App 에서 재고context export 한걸 import
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import data from "./data";

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(porps) => porps.색상};
`; //자바스크립트 문법 ' 글자 ${변수명} 글자'

// class Detail2 extends React.Component {
//   componentDidMount() {}

//   componentWillUnmount() {}
// } // 예전문법 Hook Component 가 어떤 행동을 취하기전에 가로채는것.

function Detail(props) {
  let {id} = useParams();

  const [showAlert, setAlertShow] = useState(true);
  const [inputData, inputDateChange] = useState();
  const [data, setData] = useState([]);
  let [pushTab, pushTabChange] = useState(0);
  let [스위치, 스위치변경] = useState(true);
  
  
  useEffect( ()=>{
    var arr = localStorage.getItem('watched');
    
    if(arr == null) {
      arr = []
    } else {
      arr = JSON.parse(arr)
    } //arr 가 null 값이면 배열생성.
    
    arr.push(id);
    arr = new Set(arr);
    arr = [...arr];
    arr.sort();

    setData(arr);
    localStorage.setItem('watched', JSON.stringify(arr));
  }, []);
  

  let 재고 = useContext(재고context);

  useEffect(() => {
    //2초 후에 저거 alert 창을 안보이게 해주세요.
    let timer = setTimeout(() => {
      setAlertShow(false);
      return () => {
        clearTimeout(timer);
      }; // <Detail>이 사라질때 타이머도 제거해줘.
    }, 2000);
  }, []); // Componenet 등장 , 업데이트시 실행됨.
  // [] => userEffect 가 실행될 조건 빈칸이면? Detail 등장시 한번 실행하고 끝남
  // 여러개 사용가능 , 내부에 return , [] 조건 가능.
  


  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });

  let history = useHistory();

  return (
    <div className="container">
      <박스>
        <제목 색상={"red"}>Detail</제목>
      </박스>

      {showAlert == true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>

          <Info 재고={props.재고} />

          <div className="박스">
            <input
              onChange={(e) => {
                inputDateChange(e.target.value);
              }}
            />
          </div>

          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 13]);

              props.dispatch({
                type: "항목추가",
                payload: { id: 찾은상품.id, name: 찾은상품.title, quan: 1 , inputData: inputData },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      {/* <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            evnetKey="link-0"
            onClick={() => {
              스위치변경(false);
              pushTabChange(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              pushTabChange(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent pushTab={pushTab} 스위치변경={스위치변경}></TabContent>
      </CSSTransition> */}

      <RecentInfo data = {data}></RecentInfo>

    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  }); //컴포넌트 로드 / 업데이트시 스위치켬 css 발동

  if (props.pushTab === 0) {
    return <div>0번째 내용입니다</div>;
  } else if (props.pushTab === 1) {
    return <div>1번째 내용입니다</div>;
  } else if (props.pushTab === 2) {
    return <div>2번째 내용입니다</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.재고[0]}</p>;
}

function 함수명(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
} //state 를 props 화 reducer 가 2개이상이면 이 함수도 바뀜

export default connect(함수명)(Detail); // Redux 쓰는방법 셋팅

//export default Detail;
