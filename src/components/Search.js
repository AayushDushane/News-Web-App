import React, { useState, useEffect, useContext } from 'react';
import NewsItems from './NewsItems';
import "./Search.css"
import Footer from './Footer';
import Spinner from './Spinner';
import { AppContext } from '../server/AppContext';

function Search(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const { searchText } = useContext(AppContext) || {};

    useEffect(() => {
        document.title = `${capitalize(searchText)}-News App`;
        updateNews();
    }, [searchText, page]);

    const capitalize = (s) => {
        if (typeof s !== 'undefined' && s !== null && s.length > 0) {
            return s[0].toUpperCase() + s.slice(1);
        } else {
            return ''; // or handle this case as appropriate for your application
        }
    };

    const updateNews = async () => {
        setLoading(true);
        const url = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=bef586f3eba14c3a99172a00a8db1ece&page=${page}&pagesize=${props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    return (
        <div>
            {loading ? (
                <Spinner/>
            ) : articles.length > 0 ? (
                <div className="container">
                    {articles.map((element) => (
                        <div key={element.url}>
                            <NewsItems title={element.title} description={element.description} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} category={searchText} contentUrl={element.url}/>
                        </div>
                    ))}
                    <Footer />
                </div>
            ) : (
                <div className="error-container">
                    <p className="error-text">Oops! Try to Search for Relevant Category</p>
                </div>
            )}
        </div>
    );
}

export default Search;
