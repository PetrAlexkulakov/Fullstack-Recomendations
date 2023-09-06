import { useState } from 'react';
import { useForm, SubmitHandler, MultipleFieldErrors } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar'
import classes from './styles.module.scss'
import axios from 'axios';
import TagsBody from '../../components/TagsBody';
import ErrorComponent from '../../components/ErrorComponent';
import DropFile from '../../components/DropFile';

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
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>({
    criteriaMode: "all"
  })
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
    const formData = new FormData();
    formData.append("title", title);
    formData.append("smallText", annotation);
    formData.append("fullText", text);
    formData.append("group", group);
    formData.append("tags", activeTags.join(';'));
    formData.append("image", selectedFile as File);
  
    try {
      const token = localStorage.getItem('token');
      axios.post(baseURL + "/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        navigate("/profile");
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
          <h2>Create New Review!</h2>
          <div className="mb-3 mt-2">
              <label htmlFor="InputText1" className="form-label">Title:</label>
              <input 
                type= "text"
                className="form-control"
                id="InputText1"
                placeholder='The title of the article'
                value={title}
                {...register("title", { 
                  required: "This input is required.", 
                  maxLength: {
                    value: 40,
                    message: "This input can`t exceed 40 characters"
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
              <label htmlFor="InputText2" className="form-label">Annotation:</label>
              <textarea 
                className="form-control"
                id="InputText2"
                value={annotation}
                placeholder='At this review I wanna tell about...'
                {...register("annotation", { 
                  required: "Annotation is required.", 
                  maxLength: {
                    value: 150,
                    message: "Annotation can`t exceed 150 characters"
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
            <label htmlFor="InputText3" className="form-label">Text:</label>
              <textarea 
                className="form-control"
                id="InputText3"
                placeholder='You can use Markdown'
                value={text}
                {...register("text", { 
                  required: "This input is required.", 
                  maxLength: {
                    value: 10000,
                    message: "This input can`t exceed 10000 characters"
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
              <label htmlFor="InputSelect1" className="form-label">Group:</label>
              <select 
                className="form-select" 
                id="InputSelect1" 
                value={group}
                onChange={(e) => setGroup(e.target.value)}>
                <option value="Book">Book</option>
                <option value="Game">Game</option>
                <option value="Film">Film</option>
              </select>
            </div>
            <div className='w-100'>
              <label htmlFor="InputText4" className="form-label">Input Tags:</label>
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
            <label htmlFor="InputFilm4" className="form-label">Preview Image:</label>
            <DropFile 
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              inputProps={{
                className: 'form-control',
                id: 'InputText1',
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </>
  )
}

export default CreatePost
