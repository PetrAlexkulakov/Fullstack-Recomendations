import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import classes from './styles.module.scss'
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [text, setText] = useState("");
  const [group, setGroup] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//     }
//   };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    // Создайте объект FormData для отправки файла
    const formData = new FormData();
    formData.append("title", title);
    formData.append("smallText", annotation);
    formData.append("fullText", text);
    formData.append("group", group);
    formData.append("tags", tags);
    formData.append("image", selectedFile as File);
  
    try {
      const token = localStorage.getItem('token');
      axios.post(baseURL + "/posts", formData, {
        headers: {
        //   "Content-Type": "multipart/form-data", // Укажите тип данных как multipart/form-data
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
                <input 
                    type="text" 
                    className="form-control" 
                    id="InputText1" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="InputText2" className="form-label">Annotation:</label>
                <textarea 
                    className="form-control" 
                    id="InputText2"
                    value={annotation}
                    onChange={(e) => setAnnotation(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="InputText3" className="form-label">Text:</label>
                <textarea 
                    rows={5} 
                    className="form-control" 
                    id="InputText3"
                    value={text}
                    onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-between mb-3 mt-2">
                <div className='w-25'>
                    <label htmlFor="InputSelect1" className="form-label">Select Group:</label>
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
                <div className='w-50'>
                    <label htmlFor="InputText4" className="form-label">Input Tags:</label>
                    <input type="text" 
                        className="form-control" 
                        id="InputText4" 
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputFilm4" className="form-label">Preview Image:</label>
                <input type="file" 
                    className="form-control" 
                    id="InputFilm4" 
                    onChange={(e) => setSelectedFile((e.target.files as FileList )[0])}/>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
        </form>
        </div>
    </>
  )
}

export default CreatePost
