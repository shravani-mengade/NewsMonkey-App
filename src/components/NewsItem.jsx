import React from 'react'

const NewsItem=(props)=>{
   
        let{title,description,imageurl,newsurl,author,date,source}=props
        return (
            <div>
                <div className="card my-3 position-relative" >
                  
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}  <span style={{zIndex:'2'}}className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">{source}</span></h5>
                            <p className="card-text">{description}...</p>
                            <small className="text-body-secondary" style={{fontSize:'smaller'}}>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small>
                            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark d-block ">Read more</a>
                        </div>
                </div>
            </div>
        )
    }


export default NewsItem
