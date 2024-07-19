import './index.css'

import { Component } from 'react'

class Movies extends Component{
    state={
        imageUrl:""
    }
    componentDidMount(){
        this.getdogimage()
    }

    getdogimage=async ()=>{
        const apiurl='https://dog.ceo/api/breeds/image/random'
        const options={
            method:"GET"
        }
        const response=await fetch(apiurl, options)
        if (response.ok){
            const fetchedimage = await response.json()
            const updatedimage=fetchedimage.message
            this.setState({imageUrl:updatedimage})
        }
        else{
            this.setState({imageUrl:""})
        }
    }

    render(){
        const {details}=this.props
        const {title, author, rating}=details
    
        const rated = typeof rating === 'number' ? Math.floor(rating) : 'No rating'
        const {imageUrl}=this.state
        return (
                <li className='Movie-container'>
                    <img className='image' src={imageUrl} alt='Dog-Image' />
                    <h1 className='Movie-heading'>{title}</h1>
                    <p className='author'>Author: {author}</p>
                    <p className='rating'>Rating: {rated}</p>
                </li>
        )
    }  
    
    
}

export default Movies;