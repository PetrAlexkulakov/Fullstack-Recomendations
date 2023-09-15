import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useTranslation } from "react-i18next";

const Groups = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = queryString.parse(location.search)
  const activeGroup = queryParams.group;

  const appendQueryParams = (params: { group: string }) => {
    const newQueryParams = {
      ...queryParams, // Существующие параметры
      ...params       // Дополнительные параметры
    };
    return '?' + queryString.stringify(newQueryParams);
  };

  const removeGroupParam = () => {
    const newParams = { ...queryParams };
    delete newParams.group;
    return queryString.stringify(newParams);
  };
  
  return (
    <ul className="list-unstyled mb-0">
      <li>
        <a className={activeGroup === 'film' ? 'active' : ''} href={appendQueryParams({ group: 'film' })}>
          {t('Film')}
        </a>
      </li>
      <li>
        <a className={activeGroup === 'game' ? 'active' : ''} href={appendQueryParams({ group: 'game' })}>
          {t('Game')}
        </a>
      </li>
      <li>
        <a className={activeGroup === 'book' ? 'active' : ''} href={appendQueryParams({ group: 'book' })}>
          {t('Book')}
        </a>
      </li>
      <li>
        <a className={!activeGroup ? 'active' : ''} href={`?${removeGroupParam()}`}>
          {t('Any')}
        </a>
      </li>
    </ul>
  )
}

export default Groups
