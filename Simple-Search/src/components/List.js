import React, { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { usePrevious } from "../utils/hooks";

const List = ({ data, onRemove }) => {
  const lastItem = useRef(null);
  const prevData = usePrevious(data);
  useEffect(() => {
    if (
      data &&
      prevData &&
      data.length > prevData.length &&
      (lastItem && lastItem.current)
    ) {
      lastItem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, prevData]);

  return (
    <Container>
      {data.map((item, i) => (
        <Item key={item.key} ref={i === data.length - 1 ? lastItem : null}>
          <Label href={item.key} target="_blank">
            {item.label}
          </Label>
          <RHSContainer>
            <Date>{item.date}</Date>
            <Remove
              role="button"
              tabIndex={i}
              title={`remove item - ${item.label}`}
              aria-label={`remove item - ${item.label}`}
              onClick={() => onRemove(i)}
            />
          </RHSContainer>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  max-height: 30%;
  margin-left: 3%;
  margin-right: 5%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 0;
  list-style-type: none;
  padding-right: 15px;
`;

const Label = styled.a`
  max-width: 58%;
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #303030;
`;

const RHSContainer = styled.div`
  width: 30%;
  margin-right: 5%;
`;

const Item = styled.li`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border-top: 1px solid lightgrey;
  &:last-child {
    border-bottom: 1px solid lightgrey;
  }
`;

const Date = styled.span`
  width: 140px;
  font-size: 12px;
  color: #c6c6c6;
  margin-top: 3px;
  margin-right: 10px;
`;

const Remove = styled.a`
  cursor: pointer;
  position: relative;
  width: 16px;
  height: 16px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    top: 3px;
    left: 10px;
    content: " ";
    height: 15px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ),
  onRemove: PropTypes.func
};

export default memo(List);
