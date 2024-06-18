
const ArticleCard = ({ article }) => {


  return (
    <div className="card mb-3 overflow-hidden p-3" style={{ height: "330px"}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={article.urlToImage} className="img-fluid rounded-start" alt={article.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text flex-grow-1">{article.description}</p>
            <p className="card-text">
              <small className="text-muted">Published at {new Date(article.publishedAt).toLocaleString()}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
