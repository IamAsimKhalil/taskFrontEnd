import React from "react";

interface inputProps {
  placeholder: string;
  value?: string | number;
  className?: string;
  onChange?: any;
  readOnly?: any;
}

const Input = (props: inputProps) => {
  //   console.log("props here", props);

  return (
    <>
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        className={props.className}
        onChange={props.onChange}
        readOnly={props.readOnly}
      />
    </>
  );
};

export default Input;
