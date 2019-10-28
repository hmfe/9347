import React, { memo, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { boldify } from "../utils/string";

const Select = ({ fetching, onSearch, onSelect, data, selected }) => {
  const [query, setQuery] = useState("");

  const renderItems = () => {
    if (fetching) {
      return (
        <Ellipsis>
          <Dot />
          <Dot />
          <Dot />
          <Dot />
        </Ellipsis>
      );
    }
    if (!fetching && data.length > 0) {
      return data.map(d => (
        <Item
          selected={!!selected.find(s => s.key === d.key)}
          onClick={() => onSelect(d)}
          key={d.key}
        >
          {boldify(d.label, query)}
        </Item>
      ));
    }
  };

  const setAndSend = val => {
    setQuery(val);
    onSearch(val);
  };

  return (
    <Container>
      <Input
        showShadow={data.length > 0 || fetching}
        placeholder="Search recipes"
        value={query}
        onChange={e => setAndSend(e.target.value)}
      />
      {query.length > 0 && (
        <>
          <Clear onClick={() => setAndSend("")} />
          <List showBorder={data.length > 0 || fetching}>{renderItems()}</List>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  margin-top: 0px;
  width: 97%;
`;

const Input = styled.input`
  position: relative;
  padding-left: 20px;
  z-index: 1;
  font-family: inherit;
  font-size: 16px;
  width: calc(100% - 20px);
  height: 40px;
  outline: none;
  margin-top: 10px;
  border: 2px solid lightgray;
  border-radius: 15px;
  ${p =>
    p.showShadow &&
    css`
      -webkit-box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.3);
    `}
`;

const Clear = styled.span`
  cursor: pointer;
  position: relative;
  z-index: 2;
  left: 98%;
  top: -18px;

  &:before,
  &:after {
    transform: rotate(-45deg);
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    margin-left: -25px;
    display: block;
    height: 2px;
    width: 15px;
    background-color: #9e9e9e;
  }

  &:after {
    transform: rotate(45deg);
  }
`;

const List = styled.ul`
  list-style-type: none;
  background: white;
  padding-left: 1px;
  border: ${p => (p.showBorder ? 2 : 0)}px solid lightgray;
  border-top: none;
  max-height: 164px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 95%;
  position: relative;
  left: 2%;
  margin-top: 0px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const colors = [
  "#ff7f82",
  "#ffa260",
  "#ff6b6b",
  "#ff99cc",
  "#ffcc99",
  "#99ccff",
  "#cc99ff",
  "#899aff",
  "#8bdebc",
  "#e64864"
];

const changeColor = selected => keyframes`
  0% {
    background-color: ${selected ? "lightgrey" : "white"}
  }
  100% {
    background-color: ${
      selected ? "lightgrey" : colors[Math.floor(Math.random() * colors.length)]
    }
  }
`;

const Item = styled.li`
  padding: 10px;
  margin-top: 2px;
  cursor: pointer;
  background-color: ${p => (p.selected ? "lightgrey" : "white")};
  color: #333;
  &:hover {
    animation: ${p => changeColor(p.selected)} 0.4s ease-in;
    /* this is used in order to make the background fill permanent. */
    animation-fill-mode: forwards;
  }
`;

const Ellipsis = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const first = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const second = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`;

const third = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const Dot = styled.div`
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #333;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  &:nth-child(1) {
    left: 6px;
    animation: ${first} 0.6s infinite;
  }
  &:nth-child(2) {
    left: 6px;
    animation: ${second} 0.6s infinite;
  }
  &:nth-child(3) {
    left: 26px;
    animation: ${second} 0.6s infinite;
  }
  &:nth-child(4) {
    left: 45px;
    animation: ${third} 0.6s infinite;
  }
`;

Select.propTypes = {
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string
    })
  ),
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string
    })
  )
};

export default memo(Select);
