import React from "react";
export const boldify = (text, shouldBeBold) => {
  shouldBeBold = shouldBeBold.toLowerCase();
  const textArray = text.split(shouldBeBold);
  return (
    <span>
      {textArray.map((item, index) => (
        <>
          {item}
          {index !== textArray.length - 1 && <b>{shouldBeBold}</b>}
        </>
      ))}
    </span>
  );
};
