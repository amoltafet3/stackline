import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Reviews: React.FC = () => {
  const product = useSelector((state: RootState) => state.salesData.data[0]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Reviews</h2>
      {product.reviews.map((review, index) => (
        <div key={index}>
          <h3>{review.customer}</h3>
          <p>{review.review}</p>
          <p>Rating: {review.score}/5</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
