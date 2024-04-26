import * as React from "react";
import { Text } from "react-native";
import Svg, { Path } from "react-native-svg";

function SingleCheck(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4 8l3.5 3.5 7-7"
        stroke={props.color ? props.color : "#97A2AD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DoubleCheck(props) {
  return (
    <Svg
      width={17}
      height={10}
      viewBox="0 0 17 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.53 4.47A.75.75 0 00.47 5.53l1.06-1.06zM4.5 8.5l-.53.53a.75.75 0 001.06 0L4.5 8.5zm7.53-6.47A.75.75 0 0010.97.97l1.06 1.06zM8.5 8.5l-.53.53a.75.75 0 001.06 0L8.5 8.5zm7.53-6.47A.75.75 0 0014.97.97l1.06 1.06zM.47 5.53l3.5 3.5 1.06-1.06-3.5-3.5L.47 5.53zm4.56 3.5l7-7L10.97.97l-7 7 1.06 1.06zm1.94-1l1 1 1.06-1.06-1-1-1.06 1.06zm2.06 1l7-7L14.97.97l-7 7 1.06 1.06z"
        fill="#3A73A8"
      />
    </Svg>
  );
}

function Mark({ unread, double, size = 18 }) {
  if (unread) {
    return <SingleCheck width={size} height={size} />;
  }
  if (double) {
    return <DoubleCheck width={size} height={size} />;
  }
  return <SingleCheck color="#3A73A8" width={size} height={size} />;
}

export default Mark;
