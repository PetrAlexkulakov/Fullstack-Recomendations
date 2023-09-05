import { Post } from "../../interfaces/Post";
import { dataToString } from "../../shared/dataToString";
// import ReactMarkdown from 'react-markdown';

const Card = ({ post }: { post: Post }) => {
  return (
    <>
      <div className="card-body d-flex flex-column justify-content-end align-items-center">
        <img className="w-100 pb-2" src={post.imageURL} alt="..." />
        <div className="badge bg-secondary text-decoration-none link-light w-25">{post.group}</div>
        <div className="small text-muted">{dataToString(post.createdAt)}</div>
        <h2 className="card-title h4" style={{textAlign: "left"}}>{post.title}</h2>
        {/* <ReactMarkdown 
          className="card-title h4"
          children={post.title}
        /> */}
        <p className="card-text" style={{textAlign: "left"}}>{post.smallText}</p>
        {/* <ReactMarkdown 
          className="card-text"
          children={post.smallText}
        /> */}
        <a className="btn btn-primary" href={`/post/${post.id}`}>Read more →</a>
      </div>
    </>
  )
}
//className="card-img-bottom"
export default Card
