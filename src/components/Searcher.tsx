import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { ButtonSearch, SearchResultItem, ResultsContainer } from "../styles/components/Searcher";
import { Input } from "../styles/FormStyles";

interface Props {
  assignResult: (id: string) => void;
  searchWorker: (backendApiCall: any, query: string) => Promise<any>;
}

export const Searcher: React.FC<Props> = ({ assignResult, searchWorker }) => {
  const { backendApiCall } = useContext(ApiContext);
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsSearching(true);
    const response = await searchWorker(backendApiCall, query);
    setSearchResults(response.data);
    setIsSearching(false);
  };

  console.log(searchResults);

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
            <SearchResultItem key={index} onClick={() => assignResult(result)}>
              {result.name}
            </SearchResultItem>
          ))}
        </ResultsContainer>
      )}
    </>
  );
};
