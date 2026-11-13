import React from "react";
import { Row, Col } from "../grid";

const header = {
  fontSize: "0.9rem",
};

export default function QuickLinks() {
  return (
    <div css={header}>
      <a href="https://kostasbariotis.com">https://kostasbariotis.com</a>{' • '}
      <a href="mailto:kostas@bariotis.com">kostas@bariotis.com</a>{' • '}
      <a href="https://github.com/kbariotis">GitHub</a>{' • '}
      <a href="https://www.linkedin.com/in/kostas-bariotis-2a8b7481/">LinkedIn</a>{' • '}
      <span>Thessaloniki, Greece (Remote)</span>
    </div>  
  );
}
