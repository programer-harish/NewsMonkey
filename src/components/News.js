import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from './Spinner'

export class News extends Component {
   
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  constructor(props){
    super(props);
    console.log("Hello I am a constructor!");
    this.state = {
        articles:[],
        loading:true,
        page:1,
        totalResults:0   
    }
    document.title = `${this.props.category} - NewsMonkey`;
  }
  capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  async updateNews(){
    this.props.setProgress(0)
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30)
    this.setState({loading:true})
    let data=await fetch(url);
    this.props.setProgress(70)
    this.setState({loading:false})
    let parsedData=await data.json();
    this.props.setProgress(100)
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    
  }

  async componentDidMount(){
    console.log("CDM!");
    this.updateNews();
    
  }
  handleNextClick = async ()=>{
    /*console.log('Next')
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.state.pageSize)){
    
    }
    else{
      this.setState({loading:true})
    let parsedData =await this.apiCall(this.state.page+1)
    this.setState({loading:false})
    this.setState({
      page:this.state.page +1,
      articles:parsedData.articles
    })
    }*/
    this.setState({page:this.state.page+1})
    this.updateNews();
  }
  handlePrevClick = async ()=>{
    /*console.log('prev')
    this.setState({loading:true})
    let parsedData =await this.apiCall(this.state.page-1)
    this.setState({loading:false})
    this.setState({
      articles:parsedData.articles,
      page:this.state.page-1})*/
      this.setState({page:this.state.page-1})
      this.updateNews();
  }
  fetchMoreData = async () => {
    console.log(this.state.page)
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(this.state.page)
    this.setState({page:this.state.page+1,articles:this.state.articles.concat(parsedData.articles)
      ,totalResults:parsedData.totalResults})
    
  };

  render() {
    console.log("render!");
    return ( 
      <div className="container my-3">
        <h4 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h4>
        {/*<div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
    </div>*/}
        {/*this.state.loading && <Spinner/>*/} 
        <div className="row"> 
          
        {!this.state.loading&&this.state.articles.map((element)=>{
            return(
                <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,80):''} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
            )
        })}
        
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        />
        {/*<div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>*/}
      </div>
      
    )
  }
}

export default News