import React, { useEffect } from "react";
import { useState } from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";

const Todo = ({ fbName, fbEmail, fbUid }) => {
  const navigator = useNavigate();

  // 백엔드반에 DB table DB 구성에 활용한다.
  // FB, MongDB 에서는 collection 구성에 활용한다.
  console.log(fbName, fbEmail);
  // 로컬 데이터 state 변수
  // const initTodoData = localStorage.getItem("fbTodoData")
  //   ? JSON.parse(localStorage.getItem("fbTodoData"))
  //   : [];

  const initTodoData = [];
  const [todoData, setTodoData] = useState(initTodoData);

  const handleRemoveClick = () => {
    setTodoData([]);
    // 로컬스토리지 초기화
    localStorage.setItem("fbTodoData", JSON.stringify([]));
    
  };

  // uid 없는 경우 로그인으로 바로 보내기
  useEffect(() => {
    // if (fbUid === "") {
    if (!fbUid) {
      navigator("/login");
    }
  }, []);

  // axios get 호출 fbtodolist 자료받기
  const getTodo = async () => {
    try {
      const res = await axiosInstance.get("/todos");
      const result = res.data;
      // 문제가 무엇인가하면.. "true", "false" 문자열로 들어옮
      const todosArr = result.map(item => {
        if (item.completed === "true") {
          item.completed = true;
        } else {
          item.completed = false;
        }
        return item;
      });
      setTodoData(todosArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo(setTodoData);
  }, []);

  return (
    <div className="flex justify-center items-start w-full mt-5">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-red-600 font-semibold">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할일 추가 */}
        <Form
          todoData={todoData}
          setTodoData={setTodoData}
          fbName={fbName}
          fbEmail={fbEmail}
        />
      </div>
    </div>
  );
};

export default Todo;
