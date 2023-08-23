import { Post } from "../../interfaces/Post"

const Cards = ({ posts }: { posts: Post[] }) => {
  return (
    <>
        {posts.slice(1).map((post, index) => {
            return(
                <div key={index} className="card mb-4">
                    <a href="#!"><img className="card-img-bottom" src={post.imageURL} alt="..." /></a>
                    <div className="card-body d-flex flex-column justify-content-end">
                        <div className="small text-muted">{post.createdAt}</div>
                        <h2 className="card-title h4">{post.title}</h2>
                        <p className="card-text">{post.smallText}</p>
                        <a className="btn btn-primary" href="#!">Read more →</a>
                    </div>
                </div>
            )}
        )}
    </>
  )
}

export default Cards
