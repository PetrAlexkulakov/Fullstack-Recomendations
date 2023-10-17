import { useTranslation } from "react-i18next";
import { Post } from "../../interfaces/Post"
import Card from "../Card"
import classes from './styles.module.scss'

const Cards = ({ posts, isSecondary = false, isAuthor = false }: { 
    posts: Post[], 
    isSecondary?: boolean, 
    isAuthor?: boolean }) => {
  const { t } = useTranslation();
  const isBig = window.innerWidth > 750;

  return (
    <>
      {posts.length > 0 || isSecondary ? (
        <div className={classes.cardsConteiner + ' p-0'}>
          {!isBig ? 
            posts.map((post, index) => (
              <div key={index} className="card mb-4" style={{height: 'fit-content'}}>
                <Card post={post} isAuthor={isAuthor} />
              </div>
            ))
          :
          <>{renderPostsInTwoColumns(posts, isAuthor)}</>
          }
        </div>
      ) : (
        <h3>{t('NoPosts')}</h3>
      )}
    </>
  )
}

const renderColumn = (columnPosts: Post[], isAuthor: boolean) => {
  return columnPosts.map((post, index) => (
    <div key={index} className="card mb-4" style={{ height: 'fit-content' }}>
      <Card post={post} isAuthor={isAuthor} />
    </div>
  ));
};

const renderPostsInTwoColumns = (posts: Post[], isAuthor: boolean) => {
  const column1: Post[] = [];
  const column2: Post[] = [];

  posts.forEach((post, index) => {
    if (index % 2 === 0) {
      column1.push(post);
    } else {
      column2.push(post);
    }
  });

  return (
    <>
      <div style={{ flex: 1 }}>{renderColumn(column1, isAuthor)}</div>
      <div style={{ flex: 1 }}>{renderColumn(column2, isAuthor)}</div>
    </>
  );
};


export default Cards
