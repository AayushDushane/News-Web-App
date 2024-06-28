import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';


export default function Recommend({ category }) {
  // setNewsCategory(category);
  const [recommendArticles , setRecommendArticles]=useState([]);
  console.log("recommend called");
  console.log(category)
  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=bef586f3eba14c3a99172a00a8db1ece`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        
        let rcmdArticles=await getRandomArticles(data.articles , 5);
        setRecommendArticles(rcmdArticles);
        // console.log("recommendArticles")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [category]); // Fetch data whenever the category prop changes

  // function getRandomArticles(articles , count){
  //     let randomArticles=[];
  //     let totalArticles=articles.length;
  //     const selectedIndices = new Set();

  //     while (randomArticles.length < count) {
  //       const randomIndex = Math.floor(Math.random() * totalArticles);
  //       if (!selectedIndices.has(randomIndex)) {
  //         selectedIndices.add(randomIndex);
  //         randomArticles.push(articles[randomIndex]);
  //       }
  //     }
  
  //     return randomArticles;
  // }
  // useEffect(() => {
  //   console.log(recommendArticles);
  // }, [recommendArticles]);

  function getRandomArticles(articles, count) {
    // Shuffle the articles array
    const shuffledArticles = articles.sort(() => Math.random() - 0.5);
    // Slice the shuffled array to get a subset as recommendations
    return shuffledArticles.slice(0, count);
  }
  
  return (
    <div>
        {
          recommendArticles && recommendArticles.map((element)=>{
            return(<div key={element.url}>
              
                <NewsItems title={element.title} description={element.description} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} category={category} contentUrl={element.url} />
            </div>)
          })
        }
    </div>
  );
}



