import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useState } from "react";
import TagsBody from "../../TagsBody";
import { useTranslation } from "react-i18next";

const Tags = () => {
    const [tag, setTag] = useState<string | null>(null);
    const navigator = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const queryParams = queryString.parse(location.search)
    const activeTags = typeof(queryParams.tags) === 'string' ? queryParams.tags.split(';') : queryParams.tags;

    const addTag = () => {
        if (tag) {
          const newTags = [...(activeTags || []) as string[], tag];
          const newQueryParams = {
            ...queryParams,
            tags: newTags.join(";")
          };
          navigator(`?` + queryString.stringify(newQueryParams));
          setTag(null);
        }
    };

    const deleteTag = (index: string) => {
        const newTags: string[] = ( activeTags  as string[] ).filter((_, i) => i !== Number(index));
        const newQueryParams = {
          ...queryParams,
          tags: newTags.length > 0 ? newTags.join(";") : undefined
        };
        navigator(`?` + queryString.stringify(newQueryParams));
    }

    return (
        <div className="card mb-4">
            <div className="card-header">{t('Filter')}</div>
            <TagsBody 
              tag={tag} 
              setTag={setTag} 
              activeTags={activeTags as string[] | null} 
              addTag={addTag}
              deleteTag={deleteTag} />
        </div>
    )
}

export default Tags
