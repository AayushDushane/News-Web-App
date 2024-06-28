import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import './News.css';
import Footer from './Footer';

function News(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        document.title = `${capitalize(props.category)}-News App`;
        updateNews();
    }, [page]);

    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
    };

    const updateNews = async () => {
        setLoading(true);
        const url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=bef586f3eba14c3a99172a00a8db1ece&page=${page}&pagesize=${props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    const previousPage = () => {
        setPage(page - 1);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    return (
        <div>
            <div className="container">
                {!loading && articles.map((element) => (
                    <div key={element.url}>
                        <NewsItems title={element.title} description={element.description} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} category={props.category} contentUrl={element.url}/>
                    </div>
                ))}
                {loading && <Spinner/>}
                <div className="container d-flex justify-content-center my-3">
                    {!loading && <button disabled={page <= 1} type="button" className="btn btn-dark mx-3 btn-sm" onClick={previousPage}>&larr; Previous</button>}
                    {!loading && <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark btn-sm " onClick={nextPage}>Next &rarr;</button>}
                </div>
            </div>
            {!loading && <Footer/>}
        </div>
    );
}

export default News;
