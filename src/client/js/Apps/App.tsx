import * as React from "react";
import "../../styles/Apps/App.styl";
import { Button } from "antd";

interface props {
  myName: string;
  myAge: number;
}

export const App = (props: props) => (
  <div>
    <h1>My name is {props.myName}</h1>
    <h1>I'm a {props.myAge} years old </h1>
    <Button>ボタン</Button>
  </div>
);
