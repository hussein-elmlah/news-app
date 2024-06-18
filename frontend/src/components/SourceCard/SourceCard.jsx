import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeSource, unsubscribeSource } from '../../axios/sourcesAndArticles';
import { fetchUserData, selectUser } from '../../store/slices/userSlice';

const SourceCard = ({ source }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const isSubscribed = user?.subscriptions.includes(source.id);

  const handleSubscribe = () => {
    setLoading(true);
    subscribeSource(source)
      .then(() => {
        dispatch(fetchUserData());
      })
      .catch((error) => console.error("Subscription failed:", error))
      .finally(() => setLoading(false));
  };

  const handleUnsubscribe = () => {
    setLoading(true);
    unsubscribeSource(source.id)
      .then(() => {
        dispatch(fetchUserData());
      })
      .catch((error) => console.error("Unsubscription failed:", error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="card mb-3" style={{ height: "220px"}}>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{source.name}</h5>
        <p className="card-text flex-grow-1">{source.description.slice(0,150)}</p>
        <div className="mt-auto">
          {loading ? (
            <button className="btn btn-secondary" disabled>Loading...</button>
          ) : (
            isSubscribed ? (
              <button className="btn btn-danger" onClick={handleUnsubscribe}>Unsubscribe</button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubscribe}>Subscribe</button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceCard;
