import { useTranslation } from "react-i18next";
import { Post } from "../../interfaces/Post"
import Card from "../Card"
import classes from './styles.module.scss'

const Cards = ({ posts, isSecondary = false, isAuthor = false }: { 
    posts: Post[], 
    isSecondary?: boolean, 
    isAuthor?: boolean }) => {
  const { t } = useTranslation();

  return (
    <>
      {posts.length > 0 || isSecondary ? (
        <div className={classes.cardsConteiner}>
          {posts.map((post, index) => (
            <div key={index} className="card mb-4" style={{height: 'fit-content'}}>
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
