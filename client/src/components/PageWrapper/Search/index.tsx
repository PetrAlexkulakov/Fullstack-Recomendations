import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigator = useNavigate();

  const location = useLocation();
  const queryParams = queryString.parse(location.search)
  const activeSearch = queryParams.search;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const newQueryParams = {
      ...queryParams,
      search: searchTerm
    };
    navigator(`?` + queryString.stringify(newQueryParams));
  };

  return (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        placeholder="Enter search term..."
        aria-label="Enter search term..."
        aria-describedby="button-search"
        value={searchTerm || activeSearch as string || ""}
        onChange={handleInputChange}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
            }
        }}
      />
      <button
        className="btn btn-primary"
        id="button-search"
        type="button"
        onClick={handleSearch}
      >Go!</button>
    </div>
  )
}

export default Search
