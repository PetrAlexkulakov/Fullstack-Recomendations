import { useState } from 'react';
import { useForm, SubmitHandler, MultipleFieldErrors } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar'
import classes from './styles.module.scss'
import axios from 'axios';
import TagsBody from '../../components/TagsBody';
import ErrorComponent from '../../components/ErrorComponent';
import DropFile from '../../components/DropFile';
import { addId } from '../../shared/addId';
import { useTranslation } from 'react-i18next';

interface IFormInput {
  title: string
  annotation: string
  text: string
  file: File
}

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [text, setText] = useState("");
  const [group, setGroup] = useState("Book");
  const [tag, setTag] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, formState: { errors }, setError, clearErrors, handleSubmit } = useForm<IFormInput>({
    criteriaMode: "all"
  })
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const addTag = () => {
    if (tag) {
      setActiveTags((prevTags) => [...prevTags, tag]);
      setTag(null);
    }
  };

  const deleteTag = (index: string) => {
    const newTags: string[] = ( activeTags  as string[] ).filter((_, i) => i !== Number(index));
    setActiveTags(newTags)
  }

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    const postData = {
      title: title,
      smallText: annotation,
      fullText: text,
      group: group,
      tags: activeTags.join(';') ? activeTags.join(';') : undefined,
      image: selectedFile as File
    };
  
    try {
      const token = localStorage.getItem('token');
      axios.post(baseURL + addId("/posts", id), postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        navigate(addId("/profile", id));
      });
    } catch(error) {
      console.error("Error sending data:", error);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className={classes.createContainer + " d-flex justify-content-center align-items-center"}>
        <form className={classes.createForm + " w-75 p-2"} onSubmit={handleSubmit(onSubmit)}>
          <h2>{t('CreateR')}</h2>
          <div className="mb-3 mt-2">
              <label htmlFor="InputText1" className="form-label">{t('Title')}:</label>
              <input 
                type= "text"
                className="form-control"
                id="InputText1"
                placeholder={t('TitlePl')}
                value={title}
                {...register("title", { 
                  required: t('InputReq'), 
                  maxLength: {
                    value: 40,
                    message: `${t('InputCant')} 40 ${t('characters')}`
                  } 
                })} 
                onChange={(e) => setTitle(e.target.value)}
              />
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ messages }: { message: string; messages?: MultipleFieldErrors | undefined; }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([, message]) => {
                        const uniqueKey = uuidv4();
                        return <ErrorComponent key={uniqueKey}>{message}</ErrorComponent>
                      })
                    : null;
                  }}
              />
          </div>
          <div className="mb-3">
              <label htmlFor="InputText2" className="form-label">{t('Annotation')}:</label>
              <textarea 
                className="form-control"
                id="InputText2"
                value={annotation}
                placeholder={t('AnnotationPl')}
                {...register("annotation", { 
                  required: t('InputReq'), 
                  maxLength: {
                    value: 150,
                    message: `${t('InputCant')} 150 ${t('characters')}`
                  } 
                })} 
                rows={3}
                onChange={(e) => setAnnotation(e.target.value)}
              />
              <ErrorMessage
                errors={errors}
                name="annotation"
                render={({ messages }: { message: string; messages?: MultipleFieldErrors | undefined; }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([message]) => {
                      const uniqueKey = uuidv4();
                      return <ErrorComponent key={uniqueKey}>{message}</ErrorComponent>
                    })
                    : null;
                }}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="InputText3" className="form-label">{t('Text')}:</label>
              <textarea 
                className="form-control"
                id="InputText3"
                placeholder={t('TextPl')}
                value={text}
                {...register("text", { 
                  required: t('InputReq'), 
                  maxLength: {
                    value: 10000,
                    message: `${t('InputCant')} 10000 ${t('characters')}`
                  } 
                })} 
                rows={10}
                onChange={(e) => setText(e.target.value)}
              />
              <ErrorMessage
                errors={errors}
                name="text"
                render={({ messages }: { message: string; messages?: MultipleFieldErrors | undefined; }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([, message]) => {
                      const uniqueKey = uuidv4();
                      return <ErrorComponent key={uniqueKey}>{message}</ErrorComponent>
                    })
                    : null;
                }}
              />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
            <div className='w-25 me-1'>
              <label htmlFor="InputSelect1" className="form-label">{t('Groups')}:</label>
              <select 
                className="form-select" 
                id="InputSelect1" 
                value={group}
                onChange={(e) => setGroup(e.target.value)}>
                <option value="Book">{t('Book')}</option>
                <option value="Game">{t('Game')}</option>
                <option value="Film">{t('Film')}</option>
              </select>
            </div>
            <div className='w-100'>
              <label htmlFor="InputText4" className="form-label">{t('InputTags')}:</label>
              <TagsBody 
                tag={tag} 
                setTag={setTag} 
                activeTags={activeTags} 
                addTag={addTag}
                deleteTag={deleteTag}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputFilm4" className="form-label">{t('PreviewImage')}:</label>
            <DropFile 
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              inputProps={{
                className: 'form-control',
                id: 'InputText1',
              }}
              setError={setError}
              errors={errors}
              clearErrors={clearErrors}
            />
          </div>
          <div className="d-flex justify-content-around">
            <button type="button" className="btn border-black" onClick={() => {navigate('/profile')}}>
              {t('CancelChanges')}
            </button>
            <button type="submit" className="btn btn-primary">{t('Send')}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreatePost
