import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

const Details = () => {
  const id = window.location.pathname.split("/")[2];
  const [book, setBook] = useState({});
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    ISBN: "",
    author: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      console.log(response);
      setBook(response.data);
    }
    fetchData();
    setFormData(book);
  }, [id,modal,book.ISBN]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(formData.price === '' || formData.title === '' || formData.author === '' || formData.ISBN === ''){
                alert('Please fill out all fields');
                return;
            }
            if(formData.ISBN.length !== 13  || isNaN(formData.ISBN)){
                alert('Invalid ISBN');
                return;
            }
            const response = await axios.put(`http://localhost:3000/books/${id}`, formData);
            console.log(response);
            setBook(response.data);
            
            closeModal();
        }
        catch(error){
            console.log(error);
        
        }
    }

    const handleDelete = async () => {
        try{
            const response = await axios.delete(`http://localhost:3000/books/${id}`);
            console.log(response);
            window.location.href = "/";
        }
        catch(error){
            console.log(error);
        }
    }


  return (
    <div className=" flex justify-between items-center h-screen">
      <div className="flex justify-center w-1/2 ">
        <img src={book.cover} alt="book cover" className=" w-2/4 " />
      </div>
      <div className="w-1/2 flex flex-col justify-around h-1/2 ">
        <h1 className=" text-8xl font-semibold">{book.title}</h1>
        <p className=" text-4xl font-semibold">By-{book.author}</p>
        <p className=" text-4xl font-semibold">Price-${book.price}</p>
        <p className=" text-2xl font-semibold">ISBN-{book.ISBN}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 px-4 rounded w-max " onClick={openModal}>
          Update Details
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-max " onClick={handleDelete}>
          Delete Book
        </button>
        <ReactModal
          isOpen={modal}
          onRequestClose={closeModal}
          className=" w-2/5 h-fit mx-auto mt-20 bg-slate-200 shadow-2xl opacity-100 overflow-y-hidden"
        >
          <form className="flex flex-col p-12 items-center ">
            <h1 className="text-2xl font-bold mb-6 w-fit">Update Book</h1>

            <label className="block text- font-medium text-gray-700 w-fit">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="p-2 m-2 rounded-lg w-4/6"
              defaultValue={book.title}
              onChange={handleChange}
            />
            <label className="block text- font-medium text-gray-700 w-fit">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="p-2 m-2 rounded-lg w-4/6"
              defaultValue={book.price}
              onChange={handleChange}
            />
            <label className="block text- font-medium text-gray-700 w-fit">
              Author
            </label>
            <input
              type="text"
              name="author"
              className="p-2 m-2 rounded-lg w-4/6"
                defaultValue={book.author}
              onChange={handleChange}
            />
            <label className="block text- font-medium text-gray-700 w-fit">
              ISBN
            </label>
            <input
              type="text"
              name="ISBN"
              className="p-2 m-2 rounded-lg w-4/6"
                defaultValue={book.ISBN}
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="p-2 m-2 bg-slate-300 w-4/6"
            >
                Update Book
            </button>
          </form>
        </ReactModal>
      </div>
     
    </div>
  );
};

export default Details;
