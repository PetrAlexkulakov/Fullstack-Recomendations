import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from "axios";
import { useTranslation } from 'react-i18next';

const TagsBody = ({ tag, setTag, activeTags, addTag = () => {}, deleteTag = () => {} }: { 
    tag: string | null, 
    setTag: React.Dispatch<React.SetStateAction<string | null>>,
    activeTags: string[] | null,
    addTag?: () => void,
    deleteTag?: (index: string) => void,
}) => {
  const { t } = useTranslation();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleCreateTag = async (newTag: string) => {
    const alreadyExists = activeTags?.some((tag) => tag.toLowerCase() === newTag.toLowerCase());
  
    if (!alreadyExists && newTag !== '') {
      setTag(newTag);
    }
  };

  const handleSelectChange = (selectedOption: { name: string } | null) => {
    if (selectedOption !== null) {
      setTag(selectedOption.name);
    } else {
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
    <div className="card-body">
        <div className="d-flex flex-wrap gap-1 mb-1">
            {activeTags && activeTags?.length > 0 && activeTags.map((tag, index) => 
                <div key={index} 
                    className="d-flex justify-content-between 
                    badge bg-primary text-decoration-none link-light w-25">
                    <div>{tag}</div>
                    <button
                        id={String(index)}
                        className="btn-delete p-0" 
                        onClick={(e) => deleteTag((e.target as HTMLButtonElement).id)}
                    />
                </div>
            )}
        </div>
        <div className='d-flex align-items-center'>
            <AsyncCreatableSelect
                className='w-100'
                cacheOptions
                defaultOptions
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                loadOptions={promiseOptions as any}
                value={tag !== null ? { name: tag, label: tag } : null}
                onChange={handleSelectChange}
                onCreateOption={(newTag) => handleCreateTag(newTag)}
                placeholder={t('Select')}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                    setTag(null);
                }
                }}
            />
            <button type='button' className='btn btn-primary border ms-1 p-2' onClick={addTag}>{t('Add')}</button>
        </div>
    </div>
  )
}

export default TagsBody
