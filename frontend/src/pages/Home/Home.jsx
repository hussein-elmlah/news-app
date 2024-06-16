import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscribedArticles, selectSubscribedArticles, selectTotalResults } from '../../store/slices/articleSlice';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Pagination from '../../components/pagination/Pagination';

const SubscribedArticlesPage = () => {
  const dispatch = useDispatch();
  const subscribedArticles = useSelector(selectSubscribedArticles);
  const articlesStatus = useSelector((state) => state.articles.status);
  const totalResults = useSelector(selectTotalResults);
  const totalPages = Math.ceil(totalResults / 10);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSubscribedArticles({ page: currentPage, pageSize: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <h1 className="mb-4">Subscribed Articles</h1>

      {articlesStatus === 'loading' && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {articlesStatus === 'failed' && (
        <Alert variant="danger">
          Error fetching subscribed articles. Please try again later.
        </Alert>
      )}

      {articlesStatus === 'succeeded' && (
        <div>
          <div className="row">
            {subscribedArticles.map((article, index) => (
              <div key={`key_${index}`} className="col-lg-4 col-md-6 mb-4">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default SubscribedArticlesPage;
