import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from "axios";
import { useState } from "react";

const Tags = () => {
    const [tag, setTag] = useState<string | null>(null);
    const navigator = useNavigate();
    const location = useLocation();
    const queryParams = queryString.parse(location.search)
    const activeTags = typeof(queryParams.tags) === 'string' ? queryParams.tags.split(';') : queryParams.tags;
    const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const handleSelectChange = (selectedOption: { name: string } | null) => {
        if (selectedOption !== null) {
          setTag(selectedOption.name);
        } else {
          setTag(null);
        }
    };

    const addTag = () => {
        if (tag) {
          const newTags = [...activeTags as string[], tag]; // добавляем новый тег к существующим
          const newQueryParams = {
            ...queryParams,
            tags: newTags.join(";")
          };
          navigator(`?` + queryString.stringify(newQueryParams));
          setTag(null);
        }
      };

    const promiseOptions = (inputValue: string) => {
        return new Promise((resolve) => {
          axios.get(`${baseURL}/tags`).then((res) => {
            const changedData = res.data.filter((i: { name: string }) => 
              i.name.toLowerCase().includes(inputValue.toLowerCase())).map((elem: { label: string; name: string; }) => {
                elem.label = elem.name
                return elem
              })
            resolve(changedData)
          })
        })
      };

    return (
        <div className="card mb-4">
            <div className="card-header">Filter by tags</div>
            <div className="card-body">
                {activeTags && activeTags.map((tag, index) => 
                    <div key={index} className="badge bg-primary text-decoration-none link-light m-1 w-25">{tag}</div>
                )}
                <div>
                    <AsyncCreatableSelect
                        cacheOptions
                        defaultOptions
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        loadOptions={promiseOptions as any}
                        value={tag !== null ? { name: tag, label: tag } : null}
                        onChange={handleSelectChange}
                        onCreateOption={addTag}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Tags
