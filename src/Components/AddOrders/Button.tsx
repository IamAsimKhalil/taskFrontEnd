import React from "react";
interface buttonPropsTypes {
  className: string;
  title: string;
  onclick: (params: any) => any;
}
const Button = (props: buttonPropsTypes) => {
  return (
    <>
      <button className={props.className} onClick={props.onclick}>
        {" "}
        {props.title}
      </button>
    </>
  );
};
export default Button;
