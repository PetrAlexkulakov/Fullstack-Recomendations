import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';

const Sort = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigator = useNavigate();
  const queryParams = queryString.parse(location.search)
  const activeSort = queryParams.sort;
  
  const changeQueryParams = (newSort: string) => {
    const newParams = { ...queryParams };

    if (newSort === 'rating') {
      newParams.sort = 'rating';
    } else {
      delete newParams.sort;
    }

    const newQueryString = queryString.stringify(newParams);

    navigator(`${location.pathname}?${newQueryString}`);
    window.location.reload();
  }

  return (
    <select 
      className="form-select mb-3" 
      value={activeSort === 'rating' ? 'rating' : 'date'} 
      onChange={(e) => changeQueryParams(e.target.value)}
    >
      <option value="rating">{t('SortRating')}</option>
      <option value="date">{t('SortDate')}</option>
    </select>
  )
}

export default Sort
