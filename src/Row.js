import React, { useEffect, useState } from 'react'
import instance from './axios';
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/"


const Row = ({title,fetchUrl,isLargeRow}) => {
    const [movie,setMovie] = useState([]);

    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const request = await instance.get(fetchUrl);
                setMovie(request.data.results)
                return request;
            } catch (error) {
                console.log(error)
            }   
        }
        fetchData()
    },[fetchUrl])

    console.log(movie)

    const opts = {
      height:"390",
      width:"100%",
      playerVars:{
        autoplay:1,
      },
    }

    const handleClick = (movie) =>{
      if(trailerUrl){
        setTrailerUrl('')
      }else{
        movieTrailer(movie?.name || "")
        .then((url)=>{
          //https://www.youtube.com/watch?v=XtMThy8QKqU 
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get("v"))
        }).catch(error=>console.log(error)) 
      }
    }

  return (
    <>
    <div className='row'>
      <h2>{title}</h2>
      <div className= "row_posters">
        {movie.map((movie)=>
            <img className={`row_poster ${isLargeRow && "row_posterLarge"}`}  
            key={movie.id} 
            onClick={()=>handleClick(movie)}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt={movie.name} />
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}></Youtube>}
    </div>
    </>
  )
}

export default Row;
