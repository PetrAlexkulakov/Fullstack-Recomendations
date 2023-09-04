import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import classes from './styles.module.scss'
import axios from 'axios';
import TagsBody from '../../components/TagsBody';
import InputValidator from '../../components/InputValidator';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [text, setText] = useState("");
  const [group, setGroup] = useState("Book");
  const [tag, setTag] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
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
        <form className={classes.createForm + " w-75 p-2"} onSubmit={handleSubmit}>
          <h2>Create New Review!</h2>
          <div className="mb-3 mt-2">
              <label htmlFor="InputText1" className="form-label">Title:</label>
              <InputValidator 
                type= "text"
                className="form-control"
                id="InputText1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isTextArea={false}
                stringLength={70}
              />
          </div>
          <div className="mb-3">
              <label htmlFor="InputText2" className="form-label">Annotation:</label>
              <InputValidator 
                type= "text"
                className="form-control"
                id="InputText2"
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
                isTextArea={true}
                stringLength={255}
                rows={3}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="InputText3" className="form-label">Text:</label>
            <InputValidator 
              className="form-control"
              id="InputText3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              isTextArea={true}
              rows={10}
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
            <input type="file" 
              className="form-control" 
              id="InputFilm4" 
              onChange={(e) => setSelectedFile((e.target.files as FileList )[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </>
  )
}

export default CreatePost
