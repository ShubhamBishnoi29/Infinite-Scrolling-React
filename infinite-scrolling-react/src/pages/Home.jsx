import React, { useEffect, useState } from "react";
import MovieComponent from "../components/MovieComponent";

const HomePage = () => {

    const [cardData, setCardData] = useState([]);
    const [page, setPage] = useState(1);

    const getCardData = async() => {
        try {
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
            const dataJson = await data.json();
            if(dataJson) {
                setCardData((prevData) => [...prevData, ...dataJson]);
            }
        } catch(err) {
            alert(err);
        }
    }

    const handelInfiniteScroll = async () => {
        try {
            if((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 1);
            }
        } catch(err) {
            throw(err);
        }
    }

    useEffect(() => {
        getCardData();
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll)
    },[])

    return (
        <div>
            <h1>Home Page</h1>
            <MovieComponent movieInfo={cardData} />
        </div>
    )
}

export default HomePage;


// window.innerHeight returns the inner height of the 
// window (the height of the browser window's viewport), in pixels.

// document.documentElement.scrollTop returns the number of pixels 
// that the document has been scrolled vertically.

// document.documentElement.scrollHeight returns the height of the 
// entire document, in pixels.

// The inner height of the window is the height of the viewable area 
// of the webpage, which is the height of the browser window's viewport. 
// The scroll height is the total height of the webpage, including any content 
// that extends beyond the viewable area and requires scrolling to see.

// So, window.innerHeight is the height of the viewport, 
// document.documentElement.scrollTop is the number of pixels the document 
// has been scrolled, and document.documentElement.scrollHeight is the height 
// of the entire document.