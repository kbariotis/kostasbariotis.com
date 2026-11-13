import React from "react";
import { Row, Col } from "../grid";

const header = {
  fontSize: "0.9rem",
  lineHeight: "1.5rem",
};

export default function QuickLinks() {
  return (
    <div css={header}>
      <a href="https://kostasbariotis.com">kostasbariotis.com</a>{' • '}
      <a href="mailto:kostas@bariotis.com">kostas@bariotis.com</a>{' • '}
      <a href="https://github.com/kbariotis">github.com/kbariotis</a>{' • '}
      <a href="https://linkedin.com/in/kostas-bariotis">linkedin.com/in/kostas-bariotis</a>{' • '}
      <span>Thessaloniki, Greece (Remote)</span>
    </div>  
  );
}
