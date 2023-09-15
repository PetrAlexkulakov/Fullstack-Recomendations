import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Search = ({ isProfile }: { isProfile?: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = queryString.parse(location.search)
  const activeSearch = queryParams.search;
  const [searchTerm, setSearchTerm] = useState(activeSearch as string || "");
  const navigator = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    let newQueryParams;
    if (searchTerm) {
      newQueryParams = {
        ...queryParams,
        search: searchTerm
      };
    } else {
      newQueryParams = {
        ...queryParams,
        search: undefined
      };
    }

    if (isProfile) {
      navigator(`/profile/?` + queryString.stringify(newQueryParams));
    } else {
      navigator(`/?` + queryString.stringify(newQueryParams));
    }
  };

  return (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        placeholder={t("EnterSearch")}
        aria-label="Enter search term..."
        aria-describedby="button-search"
        value={searchTerm}
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
