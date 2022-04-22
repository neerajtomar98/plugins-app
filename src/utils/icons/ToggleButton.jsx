import React from "react";

const ToggleButton = (props) => {
  const { inactive, width, height } = props;
  const fillColor = inactive ? "#FF0000" : "#3DB39E";

  return (
    <svg
      width={width ? width : "35px"}
      height={height ? height : "35px"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{ fill: fillColor }}
        d="m24 11.617c0 3.763-3.05 6.814-6.813 6.817h-10.371c-3.765 0-6.817-3.052-6.817-6.817s3.052-6.817 6.817-6.817h10.366c3.763 0 6.814 3.05 6.817 6.813zm-6.817-4.545c-2.507.001-4.54 2.034-4.54 4.542s2.033 4.542 4.542 4.542 4.542-2.033 4.542-4.542c0-1.252-.507-2.386-1.327-3.208-.822-.824-1.959-1.334-3.215-1.334-.001 0-.001 0-.002 0z"
      />
    </svg>
  );
};

export default ToggleButton;
