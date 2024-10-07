import React from "react";
import Dialogue from "./Dialogue";

function NewDay (props) {
  return <Dialogue
    onFinish={props.onFinish}
    lines={[
      { text: "It's the dawn of a new day in Laboratory 8..." }
    ]}
  />
}

export default NewDay
