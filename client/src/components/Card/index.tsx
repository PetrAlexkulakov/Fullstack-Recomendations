import { Post } from "../../interfaces/Post"
import { dataToString } from "../../shared/dataToString"

const Card = ({ post }: { post: Post }) => {
  return (
    <>
        <img className="card-img-bottom" src={post.imageURL} alt="..." />
        <div className="card-body d-flex flex-column justify-content-end align-items-center">
            <div className="badge bg-secondary text-decoration-none link-light w-25">{post.group}</div>
            <div className="small text-muted">{dataToString(post.createdAt)}</div>
            <h2 className="card-title h4">{post.title}</h2>
            <p className="card-text">{post.smallText}</p>
            <a className="btn btn-primary" href={`/post/${post.id}`}>Read more →</a>
        </div>
    </>
  )
}

export default Card
