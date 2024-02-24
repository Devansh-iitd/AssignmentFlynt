import React from "react";
import cover from "../assets/DummyBookCover.jpg"



const Book = (props) => {
    console.log(props)

    const changePage = () => {
        window.location.href = `/books/${props.book._id}`;
    }

    return (
        <>
        <div className=" flex flex-col justify-center w-fit h-fit p-4 shadow-lg bg-slate-100 hover:cursor-pointer" onClick={changePage}>
        {props.book.cover ? <img src={props.book.cover} alt="book cover" className="w-40 h-40"/> : <img src={cover} alt="book cover" className="w-40 h-40"/>}
         <p>{props.book.title}</p>
         <p>${props.book.price}</p>
         {/* <a href={`/books/${props.book._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</a> */}
        </div>
        </>
    );
    };

export default Book;