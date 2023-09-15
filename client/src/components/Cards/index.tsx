import { useTranslation } from "react-i18next";
import { Post } from "../../interfaces/Post"
import Card from "../Card"

const Cards = ({ posts, isSecondary = false, isAuthor = false }: { 
    posts: Post[], 
    isSecondary?: boolean, 
    isAuthor?: boolean }) => {
  const { t } = useTranslation();

  return (
    <>
      {posts.length > 0 || isSecondary ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {posts.map((post, index) => (
            <div key={index} className="card mb-4">
              <Card post={post} isAuthor={isAuthor} />
            </div>
          ))}
        </div>
      ) : (
        <h3>{t('NoPosts')}</h3>
      )}
    </>
  )
}

export default Cards
