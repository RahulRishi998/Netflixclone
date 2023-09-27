import React, { useEffect, useState } from 'react';
import request from './requests';
import instance from './axios';
import "./banner.css"

const Banner = () => {
    const [movie,setMovie] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const requested = await instance.get(request.fetchNetflixOriginals)
            setMovie(requested.data.results[Math.floor(Math.random() * requested.data.results.length-1)] )
        }
        fetchData();
    },[])

    console.log(movie)

    const Description = (str,n) => {
       return str?.length > n ? str.substr(0,n-1) + "..." : str;
     }
    
    return (
      <>
    <header className='banner' style ={
      {backgroundSize:"cover",
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition:"center center"
      }}
      >
    
      <div className="banner_contents">
        <h1 className='banner_title'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
            <div className="banner_button">Play</div>
            <div className="banner_button">My List</div>
        </div>

        <div className="banner_discription">{Description(movie?.overview, 150)}</div>
        <div className="banner_fadeBottom"></div>
      </div>
    </header>
    </>
  )
}

export default Banner;
