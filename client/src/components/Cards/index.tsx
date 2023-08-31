import { Post } from "../../interfaces/Post"
import Card from "../Card"

const Cards = ({ posts }: { posts: Post[] }) => {
  return (
    <>
        {posts.map((post, index) => {
            return(
                <div key={index} className="card mb-4">
                    <Card post={post} />
                </div>
            )}
        )}
    </>
  )
}

export default Cards
