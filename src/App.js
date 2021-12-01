import React from "react";
import Clock from "./Component/Clock";
import Todo from "./Component/Todo";
import Weather from "./Component/Weather";
import useInput from "./Hook/useInput";

function App() {
  return (
    <>
      <Clock />
      <Weather />
      <Todo />
    </>
  );
}

export default App;
