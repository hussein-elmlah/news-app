import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSources, selectSources } from '../../store/slices/sourceSlice';
import SourceCard from '../../components/SourceCard/SourceCard';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const AllSourcesPage = () => {
  const dispatch = useDispatch();
  const sources = useSelector(selectSources);
  const sourcesStatus = useSelector((state) => state.sources.status);

  useEffect(() => {
    if (sourcesStatus === 'idle') {
      dispatch(fetchSources());
    }
  }, [dispatch, sourcesStatus]);

  return (
    <div className="">
      <h1 className="mb-4">All Sources</h1>

      {sourcesStatus === 'loading' && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {sourcesStatus === 'failed' && (
        <Alert variant="danger">
          Error fetching sources. Please try again later.
        </Alert>
      )}

      {sourcesStatus === 'succeeded' && (
        <div className="row">
          {sources.map((source) => (
            <div key={source.id} className="col-lg-4 col-md-6 mb-4">
              <SourceCard source={source} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSourcesPage;
