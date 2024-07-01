import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopFiveSources } from '../../store/slices/sourceSlice';
import SourceCard from '../../components/SourceCard/SourceCard';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const TopFiveSourcesPage = () => {
  const dispatch = useDispatch();
  const topFiveSources = useSelector(state => state.sources.topFiveSources);
  const status = useSelector(state => state.sources.status);

  useEffect(() => {
    dispatch(fetchTopFiveSources());
  }, [dispatch]);

  return (
    <div className="top-five-sources-page pt-3">
        <h1 className='mb-4'> Top Subscribed </h1>
      {status === 'loading' && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {status === 'failed' && (
        <Alert variant="danger">
          Error fetching top five sources. Please try again later.
        </Alert>
      )}

      {status === 'succeeded' && (
        <div className="row">
          {topFiveSources?.map(source => (
            <div key={source.id} className="col-lg-4 col-md-6 mb-4">
              <SourceCard source={source} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopFiveSourcesPage;
