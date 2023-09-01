import { Post } from "../../interfaces/Post"
import Card from "../Card"

const Cards = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {posts.map((post, index) => (
            <div key={index} className="card mb-4">
              <Card post={post} />
            </div>
          ))}
        </div>
      ) : (
        <h1>No Posts Available</h1>
      )}
    </>
  )
}

export default Cards
