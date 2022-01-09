import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Jumbotron,
  Button,
} from "react-bootstrap";
import "./Detail.scss";
import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";


function RecentInfo(props) {

  let state = useSelector((state) => state); // 리덕스를 더 쉽게 사용하는 방법.

  let dispatch = useDispatch(); // 디스패치를 더 쉽게 사용하는 방법

    return(
      <div>
        <h2 className="container">최근본상품</h2>
          <div>
            {props.data.map((a,i) =>{
              return(
                <div key={i}>{a}</div>
              );
            })}
          </div>
      </div>
  
    );
  }

export default RecentInfo;