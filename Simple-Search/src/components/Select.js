import React, { memo, useState } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { boldify } from "../utils/string";

const Select = ({ fetching, onSearch, onSelect, data, selected }) => {
  const [query, setQuery] = useState("");

  const renderItems = () => {
    if (fetching) {
      return <Loading />;
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

  return (
    <Container>
      <Input
        placeholder="Search recipes"
        value={query}
        onChange={e => !setQuery(e.target.value) && onSearch(e.target.value)}
      />
      <List showBorder={data.length > 0 || fetching}>{renderItems()}</List>
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  margin-top: 0px;
  width: 97%;
`;

const Input = styled.input`
  font-family: inherit;
  font-size: 16px;
  width: calc(100% - 13px);
  height: 40px;
  padding-left: 10px;
  outline: none;
  margin-top: 10px;
  border: 2px solid lightgray;
`;

const List = styled.ul`
  list-style-type: none;
  background: white;
  margin-top: 2px;
  padding-left: 1px;
  border: ${p => (p.showBorder ? 2 : 0)}px solid lightgray;
  max-height: 150px;
  width: calc(100% - 4px);
  overflow-x: hidden;
  overflow-y: auto;
`;

const Item = styled.li`
  padding: 10px;
  margin-top: 2px;
  cursor: pointer;
  background-color: ${p => (p.selected ? "lightgrey" : "white")};
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 32px;
  height: 32px;
  &:after {
    content: " ";
    display: block;
    height: 20px;
    margin: 1px;
    margin-top: 3px;
    border-radius: 50%;
    border: 4px solid #cc071e;
    border-color: #cc071e transparent #cc071e transparent;
    animation: ${rotate} 1.2s linear infinite;
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
