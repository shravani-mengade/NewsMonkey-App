import React, { useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1)
        const [totalResults, settotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews=async(pageNo=page)=> {
        console.log("API KEY:", props.apiKey);

       props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
          props.setProgress(40)
        let parsedData = await data.json();
        props.setProgress(70)
        console.log(parsedData);
        setloading(false)
        settotalResults(parsedData.totalResults)
        setarticles(parsedData.articles)
        
         props.setProgress(100);
    }
useEffect(() => {
updateNews();
 document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;

}, [])

const fetchMoreData=async()=>{
    const nextPage=page+1;
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        
        if(parsedData.articles.length==0){
            settotalResults(articles.length)
            return;
        }
      setpage(nextPage)
      settotalResults(parsedData.totalResults)
      setarticles(articles.concat(parsedData.articles))
}
 

        return (

            <>
                <h2 className="text-center my-3">NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles && articles.length}
                    next={fetchMoreData}
                    hasMore={articles && articles.length < totalResults}

                    loader={<Spinner/>}
                    >
                <div className="container">
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} 
                            description={element.description ? element.description.slice(0, 88) : ""}
                             imageurl={element.urlToImage?.replace("http://", "https://")}
                                newsurl={element.url} 
                                author={element.author} 
                                date={element.publishedAt}
                                 source={element.source.name} />
                        </div>
                    })}
                    </div>
                    </div>
                    </InfiniteScroll>
                    </>
            



        )
    }



News.defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general',

    }
    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    export default News 