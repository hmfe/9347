import React, { useState } from "react";
import styled from "styled-components";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

import List from "../../components/List";
import { getDateWithFormat } from "../../utils/date";

import "antd/dist/antd.css";

const { Option } = Select;

const App = () => {
  const [lastFetched, setLastFetched] = useState(0);
  const [selected, setSelected] = useState([]);
  const [remote, setRemote] = useState({
    data: [],
    fetching: false
  });

  const fetchRecipe = debounce(value => {
    setLastFetched(lastFetched + 1);
    const fetchId = lastFetched;
    setRemote({ data: [], fetching: true });
    fetch(
      `https://www.food2fork.com/api/search?key=27a5d51a4f75a9ca8d025232aea9a29a&q=${value}`
    )
      .then(response => response.json())
      .then(body => {
        if (fetchId !== lastFetched) {
          // for fetch callback order
          return;
        }
        if (Object.prototype.hasOwnProperty.call(body, "error")) {
          return alert("API key exhausted.");
        }
        const data = body.recipes.map(recipe => ({
          label: recipe.title,
          value: recipe.source_url
        }));
        setRemote({ data, fetching: false });
      })
      .catch(() => setRemote({ data: [], fetching: false }));
  }, 300);

  const handleChange = value => {
    if (value) {
      const found = selected.find(x => x.key === value.key);
      if (!found) {
        setSelected([
          ...selected,
          {
            ...value,
            date: getDateWithFormat()
          }
        ]);
      }
    }
  };

  const onRemove = index =>
    setSelected(selected.filter((_item, i) => i !== index));

  const onClearSearchHistory = () => setSelected([]);

  const { fetching, data } = remote;

  return (
    <Container>
      <Select
        allowClear
        autoClearSearchValue
        showSearch
        labelInValue
        placeholder="Search recipes"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        showArrow={false}
        defaultActiveFirstOption={false}
        onSearch={fetchRecipe}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {data &&
          data.map(recipe => (
            <Option key={recipe.value}>{recipe.label}</Option>
          ))}
      </Select>
      {selected && selected.length > 0 && (
        <History>
          <Header>
            <Title>Search History</Title>
            <Clear
              title={"Clear search history"}
              aria-label={"Clear search history"}
              role="button"
              tabIndex={-1}
              onClick={onClearSearchHistory}
            >
              Clear search history
            </Clear>
          </Header>
          <List data={selected} onRemove={onRemove} />
        </History>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  max-width: 500px;
  max-height: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: whitesmoke;
  padding: 0.5rem;
`;

const History = styled.div`
  position: absolute;
  bottom: 0;
  width: 97%;
`;

const Header = styled.div`
  margin-top: 10rem;
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const Title = styled.h3``;

const Clear = styled.a`
  text-decoration: underline;
  color: #515151;
  font-size: 12px;
  margin-top: 5px;
`;

export default App;
