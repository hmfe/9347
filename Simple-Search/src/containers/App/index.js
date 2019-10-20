import React, { useState } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { List, Select } from "../../components";
import { getDateWithFormat } from "../../utils/date";

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
    setRemote({ data: [], fetching: value.length > 0 });
    if (value.length > 0) {
      fetch(
        `https://www.food2fork.com/api/search?key=2dec20875ceda4da050781b02539d971&q=${value}`
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
            label: recipe.title.toLowerCase(),
            key: recipe.source_url
          }));
          setRemote({ data, fetching: false });
        })
        .catch(() => setRemote({ data: [], fetching: false }));
    }
  }, 300);

  const handleSelect = value => {
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
        onSearch={fetchRecipe}
        onSelect={handleSelect}
        fetching={fetching}
        data={data}
        selected={selected}
      />
      {selected && selected.length > 0 && (
        <>
          <Header>
            <h3>Search History</h3>
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
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 500px;
  height: 500px;
  background-color: whitesmoke;
  // padding: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const Clear = styled.a`
  text-decoration: underline;
  color: #515151;
  font-size: 0.9em;
  margin-top: 1.27em;
  cursor: pointer;
`;

export default App;
