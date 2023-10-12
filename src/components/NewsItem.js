
import React from 'react'

const NewsItem =(props)=>  {
  
    let {title,description,imageUrl,url,author,date,source}=props;
    return (
        <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span className="badge rounded-pill bg-danger">
          {source}</span>
          </div>
        <img src={imageUrl==null?'https://www.greatandhra.com/newphotos10/balakrishnaraju%20(1)1669675205.jpg':imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h6 className="card-title">{title}...</h6>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} {new Date(date).toGMTString()} </small></p>
          <a href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
      </div>
    )
}

export default NewsItem