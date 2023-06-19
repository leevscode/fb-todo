import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from "antd";

const Login = ({ setFBName, setFBEmail, setFBUid }) => {
  // Link, NavLink, useNaviage
  const navigate = useNavigate();
  // 로그인
  
  // Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async values => {
    console.log("Success:", values);
    // Firebase 로그인
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      // 로그인 된 사용자 정보를 가지고 옮
      const user = firebase.auth().currentUser;
      console.log("로그인 성공");
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/invalid-email") {
        setModalMessage("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        setModalMessage("올바르지 않은 비밀번호입니다.");
      } else if (error.code === "auth/user-not-found") {
        setModalMessage("가입되지 않은 사용자 입니다.");
      } else if (error.code === "auth/missing-email") {
        setModalMessage("이메일이 입력되지 않았습니다.");
      } else {
        setModalMessage("로그인이 실패하였습니다.");
      }
      showModal();
    }
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  // const handleLogin = async e => {
  //   e.preventDefault();
  //   // Firebase 로그인
  //   try {
  //     // await firebase.auth().signInWithEmailAndPassword(email, password);
  //     // 로그인 된 사용자 정보를 가지고 옮
  //     const user = firebase.auth().currentUser;
  //     console.log("로그인 성공");
  //     console.log(user);
  //     setFBName(user.displayName);
  //     setFBEmail(user.email);
  //     setFBUid(user.uid);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.code);
  //     if (error.code === "auth/invalid-email") {
  //       alert("올바른 이메일 형식이 아닙니다.");
  //     } else if (error.code === "auth/wrong-password") {
  //       alert("올바르지 않은 비밀번호입니다.");
  //     } else if (error.code === "auth/user-not-found") {
  //       alert("가입되지 않은 사용자 입니다.");
  //     } else if (error.code === "auth/missing-email") {
  //       alert("이메일이 입력되지 않았습니다.");
  //     } else {
  //       alert("로그인이 실패하였습니다.");
  //     }
  //   }
  // };
  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>

      {/* AntD Modal */}
      <Modal
        title="로그인 알람"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
      {/*  AntD form */}
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Email 을 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!",
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 passengers"));
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>날 기억 해줘!</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff" }}
          >
            로그인
          </Button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to="/signup">
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#1677ff" }}
            >
              회원가입
            </Button>
          </Link>
        </Form.Item>
      </Form>

      {/* 
        1. emotion 을 활용하여 tag 의 용도를 구분한다. 
        2. css 도 함께 적용한다.
      */}
      {/* <LoginDiv>
        <form>
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            maxLength={16}
          />

          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleLogin(e)}
            >
              로그인
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                console.log("비밀번호 찾기");
              }}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </LoginDiv> */}
    </div>
  );
};

export default Login;
