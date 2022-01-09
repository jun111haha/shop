/* eslint-disable */
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Jumbotron,
  Button,
} from "react-bootstrap";
import "./App.css";
import React, { useContext, useState, lazy, Suspense } from "react";
import Data from "./data.js";
// import Detail from "./Detail.js";
let Detail = lazy(()=> import ('./Detail.js')); //lazy 처리 필요할때만 렌더링(사용)

import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import Cart from "./Cart";

export let 재고context = React.createContext(); // 범위를 생성해주는 문법 (같은 변수값을 공유할 범위)
//export 는 다른 파일js 에서도 사용가능하게 해줌

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [loading, loading변경] = useState(false);
  let [count, setCount] = useState(1);
  let [재고, 재고변경] = useState([10, 11, 12]);
  let [localStorage, localStorageChange] = useState();

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />; // a : shoes 안에 있는 하나하나 데이터
                  //i : 반복되는 숫자 // shoes={shoes[i]} i={i} props 로 보내는 구문
                })}
              </div>
            </재고context.Provider>

            {count == 2 ? null : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      setCount(count + 1);
                      shoes변경([...shoes, ...result.data]); //... 는 괄호를 벗겨줌 [{}, {}, {}] => {}, {}, {}
                      loading변경(true);
                      // let arrayCopy = [...shoes];
                      // arrayCopy.unshift(result.data);
                      // shoes변경(arrayCopy);
                    }) //axios 성공할때 코드
                    .catch(() => {
                      console.log("실패");
                    }); //axios 실패할때 코드
                }}
              >
                더보기
              </button>
            )}

            {loading == true ? <Loading></Loading> : null}
          </div>
        </Route>

        <Route path="/detail/:id">
          <Suspense fallback = {<div>로딩중이에요</div>}>
            <재고context.Provider value={재고}>
              <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
            </재고context.Provider>
          </Suspense>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/:id">
          <div>아무거나적었을때 이거 보여주셈</div>
        </Route>
      </Switch>
    </div>
  );
}

//Switch 여러개가 맞아도 맨위에서부터 하나만 보여주는 라이브러리(중복매치X).
// function Card(props) {
//   return(
//     <div className="col-md-4">
//       <img src ={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"></img>
//         <h4>{props.shoes.title}</h4>
//       <p>{props.shoes.content} & {props.shoes.price}</p>
//   </div>
//   )
// }
// card.js 생성후 컴포넌트화 시킴.

function Loading() {
  return (
    <div className="my-alert2">
      <p>로딩중입니다.</p>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);
  let history = useHistory();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.shoes.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      ></img>
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
      <Test></Test>
    </div>
  );
}

function Test() {
  let 재고 = useContext(재고context);

  return <p>재고 : {재고}</p>;
}

export default App;
