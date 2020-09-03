import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import getLogin from "../../Context/Context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const SettingInfo = ({ token, userInfo }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const url = "http://54.180.108.57:5000/";
  const value = useContext(getLogin);

  const handleModifiedButton = async event => {
    event.preventDefault();
    if (password1 !== password2) {
      alert("비밀번호가 틀립니다.");
      document.querySelector(".input_password1").value = "";
      document.querySelector(".input_password2").value = "";
    }
    let data = {};
    data.email = userInfo.email;
    data.password = password2;
    data.age = age;
    data.city = city;
    if (password2 === "" || age === "" || city === "") {
      return alert("빈항목이 있습니다.");
    }
    await axios
      .patch(url + "/mypage", data, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(res => {
        if (res.status === 201) {
          alert("수정완료~!");
        } else {
          alert("수정실패 다시 시도 바랍니다.");
        }
      });
    value.handleIsChecking();
  };

  const handleCancel = () => {
    value.handleIsChecking();
  };

  const handleChange = event => {
    if (event.target.name === "password1") {
      setPassword1(event.target.value);
    }
    if (event.target.name === "password2") {
      setPassword2(event.target.value);
    }
    if (event.target.name === "city") {
      setCity(event.target.value);
    }
  };

  const handleClick = event => {
    setAge(Number(event.target.value));
  };

  return (
    <>
      <Container>
        <h1 title="mypage">정보수정</h1>
        <div>
          <label>이메일 : </label>
          <label>{userInfo.email}</label>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            className="input_password1"
            type="password"
            name="password1"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            className="input_password2"
            type="password"
            name="password2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>닉네임 : </label>
          <label>{userInfo.nickName}</label>
        </div>
        <div>
          <label>나이대 : </label>
          <select name="age" onClick={handleClick}>
            <option value="0">10대이하</option>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대</option>
            <option value="70">70대이상</option>
          </select>
        </div>
        <div>
          <label>격리된 지역 : </label>
          <input
            className="input_location"
            type="text"
            name="city"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleModifiedButton}>
          수정완료
        </button>
        <button onClick={handleCancel}>취소</button>
      </Container>
    </>
  );
};

export default SettingInfo;
