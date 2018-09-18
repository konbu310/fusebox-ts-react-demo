import * as React from "react";
import * as ReactDOM from "react-dom";
import "../styles/antd/index.less";

import { App } from "./Apps/App";

ReactDOM.render(
  <App myName={"yuya"} myAge={21} />,
  document.getElementById("root")
);
