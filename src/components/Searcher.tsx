import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { Input } from "../styles/FormStyles";
import { ButtonSearch, SearchResultItem, ResultsContainer } from "../styles/components/Searcher";

interface Props {
  assignResult: (id: string) => void;
  searchWorker: (backendApiCall: any, query: string) => Promise<any>;
}

export const Searcher: React.FC<Props> = ({ assignResult, searchWorker }) => {
  const { backendApiCall } = useContext(ApiContext);
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Track selected item

  const handleSearch = async () => {
    setIsSearching(true);
    const response = await searchWorker(backendApiCall, query);
    setSearchResults(response.data);
    setIsSearching(false);
  };

  const handleSelect = (result: any) => {
    assignResult(result);
    setSelectedItem(result);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Input
          placeholder="Buscar por nombre"
          type="text"
          name="search"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <ButtonSearch onClick={handleSearch}>Buscar</ButtonSearch>
      </div>
      {isSearching && <p>Buscando...</p>}
      {searchResults && (
        <ResultsContainer>
          {searchResults.map((result: any, index: number) => (
            <SearchResultItem
              key={index}
              onClick={() => handleSelect(result)}
              style={{
                backgroundColor: selectedItem === result ? "#d3d3d3" : "transparent",
              }}
            >
              {result.name}
            </SearchResultItem>
          ))}
        </ResultsContainer>
      )}
    </>
  );
};
