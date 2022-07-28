//context <API></>
//useContext
import React, { useState,useContext,useEffect} from 'react';

 export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}` 

const AppContext = React.createContext();
const AppProvider = ({children}) =>{

 const [loading, setLoading] = useState(true);
 const [movie, setMovie] = useState([]);
 const [isError,setIsError] = useState({show:"false",msg:""});
 const [query,setQuery] = useState("harry potter");

      const getMovies = async (url) =>{
        setLoading(true);
        try{
        const res = await fetch(url);
        const data =await res.json();
        console.log(data);
        if(data.Response === "True"){
            setLoading (false);
            setIsError({
                show:true,
                msg:"",
            })
            setMovie(data.Search)
        }else{
            setIsError({
                show:true,
                msg:data.Error,
            })
        }
    }catch(error){
        console.log(error);
    }
};


        useEffect (() =>{
      let timerOut =  setTimeout (() =>{
        getMovies(`${API_URL}&s=${query}`);
        },800);

        return () => clearTimeout(timerOut)
  
         },[query]);

    return(
    <AppContext.Provider value={{loading,isError,movie,query,setQuery}}>
        {children}
    </AppContext.Provider>
    );
};

//global custom hooks
const useGlobalContext = () => {
    return useContext(AppContext);
}


export {AppContext,AppProvider,useGlobalContext };

