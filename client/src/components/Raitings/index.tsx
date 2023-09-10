import { Post } from "../../interfaces/Post";
import star from '../../assets/star.png';
import emptyStar from '../../assets/star-dark.png';
import classes from './styles.module.scss';
import { useEffect, useState } from 'react';
import axios from "axios";

const Ratings = ({ post, canChange = false }: { post: Post, canChange?: boolean }) => {
  const initialRating = Number(post.raiting);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(5);
  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL

  useEffect(() => {
    // Запрос на сервер для получения текущей оценки пользователя
    if (canChange && token) {
      axios.get(`${baseURL}/raitings/${post.id}/user-rating`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setUserRating(res.data.rating || 0);
        setHoveredRating(res.data.rating || 0);
      });
    }
  }, [canChange, post.id, token, baseURL]);

  if (initialRating < 0 || initialRating > 5) {
    return null;
  }

  const handleStarClick = (starIndex: number) => {
    if (isLoading || !token) {
        return;
    }
  
    const newRating = starIndex + 1;

    axios.post(`${baseURL}/raitings/${post.id}/rating`, { rating: starIndex + 1 }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }).then(() => {
      // Обновление оценки пользователя и состояния загрузки
      setUserRating(newRating)
      setHoveredRating(newRating);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Error while saving rating:', error);
      setIsLoading(false);
    });

    setIsLoading(true);
  };

  const handleStarMouseEnter = (starIndex: number) => {
    setHoveredRating(starIndex + 1);
  };

  const handleStarMouseLeave = () => {
    setHoveredRating(userRating);
  };

  let solidStarsCount = Math.round(initialRating);
  let emptyStarsCount = 5 - solidStarsCount;

  if (canChange) {
    solidStarsCount = hoveredRating;
    emptyStarsCount = 5 - solidStarsCount;
  }

  const firstStars = Array.from({ length: solidStarsCount }, (_, index) => canChange ? (
    <img
      key={`solidStar-${index}`}
      src={star}
      alt="Solid Star"
      className={classes.star}
      onClick={() => handleStarClick(index)}
      onMouseEnter={() => handleStarMouseEnter(index)}
      onMouseLeave={handleStarMouseLeave}
    />
  ) : (
    <img key={`solidStar-${index}`} className={classes.star} src={star} alt="Empty Star" />
  ));

  const secondStars = Array.from({ length: emptyStarsCount }, (_, index) => canChange ? (
    <img
      key={`emptyStar-${index}`}
      src={hoveredRating >= solidStarsCount + index + 1 ?  star : emptyStar}
      alt="Empty Star"
      className={classes.star}
      onClick={() => handleStarClick(solidStarsCount + index)}
      onMouseEnter={() => handleStarMouseEnter(solidStarsCount + index)}//? here?
      onMouseLeave={handleStarMouseLeave}
    />
    ) : (
    <img key={`emptyStar-${index}`} className={classes.star} src={emptyStar} alt="Solid Star" />
  ));

  return (
    <div className="d-flex">
      {firstStars}
      {secondStars}
    </div>
  );
};

export default Ratings;
