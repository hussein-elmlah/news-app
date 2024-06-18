import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSources, selectSources, selectSourcesStatus, selectTotalResults } from '../../store/slices/sourceSlice';
import SourceCard from '../../components/SourceCard/SourceCard';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Pagination from '../../components/pagination/Pagination';

const AllSourcesPage = () => {
  const desiredPageSize = 6;
  const dispatch = useDispatch();
  const sources = useSelector(selectSources);
  const sourcesStatus = useSelector(selectSourcesStatus);
  const totalResults = useSelector(selectTotalResults);
  const totalPages = Math.ceil(totalResults / desiredPageSize);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSources({ page: currentPage, pageSize: desiredPageSize }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <div>
          <div className="row">
            {sources.map((source) => (
              <div key={source.id} className="col-lg-4 col-md-6 mb-4">
                <SourceCard source={source} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default AllSourcesPage;
