import './index.css'
import Movies from '../Movies'
import NotFound from '../NotFound'
import {ThreeDots} from 'react-loader-spinner'
import { Component } from 'react'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class Home extends Component{
    state={
        inputsearch:"",
        moviesList:[],
        apistatus:apiStatusConstants.initial
    }

    getMovies=async ()=>{
        this.setState({
            apistatus: apiStatusConstants.inProgress
          })

        const {inputsearch}=this.state
        const apiurl=`https://openlibrary.org/search.json?q=${inputsearch}`
        const options={
            method:"GET"
        }
        const response = await fetch(apiurl, options)
        console.log(response)
        if (response.ok) {
            const fetchedData = await response.json();
            console.log(fetchedData)
            const updatedData = fetchedData.docs.map(book => ({
              title: book.title,
              author:book.author_name,
              published:book.publish_year,
              rating:book.ratings_average
              
            }))
            console.log(updatedData)
            this.setState({
              apistatus: apiStatusConstants.success,
              moviesList:updatedData,
              inputsearch:""
            })
          } 
          else {
            this.setState({
              apistatus: apiStatusConstants.failure,
              moviesList:[]
            })
          }
    }

    changesearchInput=event=>{
        this.setState({inputsearch:event.target.value})
    }

    searchformovie=(event)=>{
        if (event.key==='Enter')
            {this.getMovies()
            
            }
    }

    successview=()=>{
        const{moviesList}=this.state
        return(
            <ul className='list-of-movies'>
                {moviesList.map(each=>(
                    <Movies details={each} key={each.title} />
                ))}
            </ul>
            )
    }

    failureview=()=>(
            <NotFound />
        )
    

    loadingview=()=>(
        <div className="loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
    )
    

    rendermovies=()=>{
        const{apistatus}=this.state
        switch(apistatus){
            case (apiStatusConstants.success):
                return this.successview()
            case (apiStatusConstants.inProgress):
                return this.loadingview()
            case (apiStatusConstants.failure):
                return this.failureview()
            default :
                return
        }
    }

    render(){
        const {inputsearch}=this.state
        return(
            <div className='main-container'>
                    <h1 className='main-heading'>Movie Explorer</h1>
                    <p className='main-para'>Discover Your Next Favorite Film</p>
                <div className='input-field'>
                    <label className='label' htmlFor='search-field'>Search For A Movie</label>
                    <input id='search-field'
                    type='search'
                    className='search-field'
                    placeholder='Enter movie title...'
                    value={inputsearch}
                    onChange={this.changesearchInput}
                    onKeyDown={this.searchformovie} />
                </div>
                <div>
                    {this.rendermovies()}
                </div>
            </div>
        )
    }
}

export default Home;