import React from "react";
import style from "./Stage.module.sass";

export default function Stage({ children, ...props }) {
  return <div className={style.stage}>{children}</div>;
}
