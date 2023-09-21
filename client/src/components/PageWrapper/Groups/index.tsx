import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useTranslation } from "react-i18next";
import AccordionWrapper from "../AccordionWrapper";

const Groups = ({ isSmall }: { isSmall: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = queryString.parse(location.search)
  const activeGroup = queryParams.group;

  const appendQueryParams = (params: { group: string }) => {
    const newQueryParams = {
      ...queryParams,
      ...params      
    };
    return '?' + queryString.stringify(newQueryParams);
  };

  const removeGroupParam = () => {
    const newParams = { ...queryParams };
    delete newParams.group;
    return queryString.stringify(newParams);
  };

  const body = (
    <div className="card-body">
      <div className="row">
        <div className="col-sm-12">
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
        </div>
      </div>
    </div>
  )
  
  return (
    (isSmall ? (
      <AccordionWrapper header={t('groups')}>
        {body}
      </AccordionWrapper>
    )
    :
      (
      <div className="card mb-4">
        <div className="card-header">{t('groups')}</div>
        {body}
      </div>
      )
    )
  )
}

export default Groups
