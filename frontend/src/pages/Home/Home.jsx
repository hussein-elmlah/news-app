import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchCountryNews('EG');
  }, []);

  const fetchCountryNews = async (countryCode) => {
    const newsApiKey = "f7d3b498b0b84f7399e6590959523a9e";
    // const apiUrl = `https://api.worldnewsapi.com/search-news?api-key=${newsApiKey}&source-countries=${countryCode}`;
    const apiUrl = '';

    // try {
    //   const response = await axios.get(apiUrl);
    //   if (response.status === 200) {
    //     setNews(response.data.news);
    //   } else {
    //     console.error("Error: Unable to fetch data.");
    //   }
    // } catch (error) {
    //   console.error("Exception:", error.message);
    // }
  };

  return (
    <div className="container mt-5">
      <h2>Home page</h2>
      <div className="row" id="newsSection">
        {news.map((newsItem) => (
          <div key={newsItem.id} className="col-md-3 col-sm-6 overflow-hidden">
            <div className="news-box">
              <div className="new-thumb" style={{ height: '159.69px' }}>
                <span className="cat c1">General</span>
                <img className="h-100" src={newsItem.image} alt="no-image" />
              </div>
              <div className="new-txt">
                <ul className="news-meta">
                  <li>{newsItem.publish_date}</li>
                </ul>
                <h6 style={{ lineHeight: 1.2, maxHeight: '110px' }}>
                  <a href="index.html#">{newsItem.title}</a>
                </h6>
                <div className="bg-white position-relative">
                  <p style={{ height: '170px', overflow: 'hidden' }} className="bg-white overflow-hidden">
                    {newsItem.text.substring(0, 100).replace(/ (\S+)$/, '.')}
                  </p>
                </div>
              </div>
              <div className="news-box-f">
                <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="" />
                {newsItem.author.split(" ", 1)[0]}
                <a href="index.html#"><i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
