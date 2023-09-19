import { Post } from "../../interfaces/Post";
import { useEffect, useState } from 'react';
import axios from "axios";
import ReactStars from "react-rating-stars-component";

const Ratings = ({ post, canChange = false }: { post: Post, canChange?: boolean }) => {
  const initialRating = Number(post.raiting);
  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    if (canChange && token) {
      axios.get(`${baseURL}/raitings/${post.id}/user-rating`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setUserRating(res.data.rating);
      });
    }
  }, [canChange, post.id, token, baseURL]);

  const handleStarClick = (newRating: number) => {
    if (!token) {
      return;
    }

    axios.post(`${baseURL}/raitings/${post.id}/rating`, { rating: newRating }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setUserRating(newRating);
    }).catch((error) => {
      console.error('Error while saving rating:', error);
    });
  }

  return (
    <div className="d-flex">
      {canChange ? (
        <ReactStars
          key={userRating}
          count={5}
          value={userRating || initialRating} 
          isHalf={true}
          size={30}
          edit={true}
          color2={'#ffd700'}
          onChange={handleStarClick}
        />
      ) : (
        <ReactStars
          count={5}
          value={initialRating}
          isHalf={true}
          size={30}
          edit={false}
          color2={'#ffd700'}
        />
      )}
    </div>
  );
};

export default Ratings;