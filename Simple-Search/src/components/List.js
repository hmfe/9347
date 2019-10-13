import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const List = ({ data, onRemove }) => (
  <Container>
    {data.map((item, i) => (
      <Item key={item.key}>
        <Label>{item.label}</Label>
        <Date>{item.date}</Date>
        <Remove
          role="button"
          tabIndex={i}
          title={`remove item - ${item.label}`}
          aria-label={`remove item - ${item.label}`}
          onClick={() => onRemove(i)}
        />
      </Item>
    ))}
  </Container>
);

const Container = styled.ul`
  max-height: 230px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding-left: 0;
  list-style-type: none;
`;

const Item = styled.li`
  display: inline-flex;
  width: 100%;
  padding: 8px;
  border-top: 1px solid lightgrey;
  &:last-child {
    border-bottom: 1px solid lightgrey;
  }
`;

const Label = styled.span`
  max-width: 280px;
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #303030;
`;

const Date = styled.span`
  width: 140px;
  font-size: 12px;
  color: #c6c6c6;
  margin-right: 30px;
  margin-left: 20px;
  margin-top: 3px;
`;

const Remove = styled.a`
  position: relative;
  right: 15px;
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

export default List;
