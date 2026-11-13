import React from "react";
import { Row, Col } from "../grid";

const headerItem = {
  paddingRight: "10px",
  paddingLeft: "10px",
};

export default function QuickLinks() {
  return (
    <div>
      <a href="https://kostasbariotis.com">https://kostasbariotis.com</a>{' • '}
      <a href="mailto:kostas@bariotis.com">kostas@bariotis.com</a>{' • '}
      <a href="https://github.com/kbariotis">GitHub</a>{' • '}
      <a href="https://www.linkedin.com/in/kostas-bariotis-2a8b7481/">LinkedIn</a>
    </div>  
  );
}
