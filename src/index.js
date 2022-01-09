import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // 경로가 없고 . 이 대게 없으면 ? 리액트 라이브러리 이름

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === "닫기") {
    state = false;

    return state;
  }
    return state;
  }

let 초기값 = [
  { id: 0, name: "신발", quan: 2 },
  { id: 1, name: "신발2", quan: 1 },
]; //state

function reducer(state = 초기값, 액션) {
  if (액션.type === "항목추가") {
    //state안에 id : 액션.payload 인게 있냐?
    let found = state.findIndex((e) => {
      return e.id === 액션.payload.id;
    });

    if (found >= 0 && 액션.payload.inputData === undefined) {

      let copy = [...state];
      copy[found].quan++;
      return copy;

    } else if (액션.payload.inputData != undefined && 액션.payload.inputData > 0) {

      let newQuan = parseInt(액션.payload.inputData);

      let copy = [...state];
      copy[found].quan += newQuan;
      return copy;

    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }
  } else if (액션.type === "수량증가") {
    let copy = [...state];
    copy[액션.payload].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];

    if (copy[액션.payload].quan <= 0) {
      copy[액션.payload].quan = 0;

      return copy;
    } else {
      copy[액션.payload].quan--;
      return copy;
    }
  } else {
    return state;
  }
} //Redux 에서 데이터 조작 방법

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
