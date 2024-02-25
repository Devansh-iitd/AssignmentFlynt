import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Book from "../components/book";
import ReactModal from "react-modal";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    ISBN: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/books");
      // console.log(response);
      setBooks(response.data);
    }
    fetchData();
  }, [modal]);
  //console.log(books);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.price === "" ||
        formData.title === "" ||
        formData.author === "" ||
        formData.ISBN === ""
      ) {
        alert("Please fill out all fields");
        return;
      }
      if (formData.ISBN.length !== 13 || isNaN(formData.ISBN)) {
        alert("Invalid ISBN");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/books",
        formData
      );

      setBooks([...books, response.data]);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 justify-around ">
        {books.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Book
      </button>
      <ReactModal
        isOpen={modal}
        onRequestClose={closeModal}
        className=" w-2/5 h-fit mx-auto mt-20 bg-slate-200 shadow-2xl opacity-100 overflow-y-hidden"
      >
        <form className="flex flex-col p-12 items-center ">
          <h1 className="text-2xl font-bold mb-6 w-fit">Add Book</h1>

          <label className="block text- font-medium text-gray-700 w-fit">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="p-2 m-2 rounded-lg w-4/6"
            onChange={handleChange}
          />
          <label className="block text- font-medium text-gray-700 w-fit">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="p-2 m-2 rounded-lg w-4/6"
            onChange={handleChange}
          />
          <label className="block text- font-medium text-gray-700 w-fit">
            Author
          </label>
          <input
            type="text"
            name="author"
            className="p-2 m-2 rounded-lg w-4/6"
            onChange={handleChange}
          />
          <label className="block text- font-medium text-gray-700 w-fit">
            ISBN
          </label>
          <input
            type="text"
            name="ISBN"
            className="p-2 m-2 rounded-lg w-4/6"
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="p-2 m-2 bg-slate-300 w-4/6">
            Add Book
          </button>
        </form>
      </ReactModal>
    </div>
  );
};

export default AllBooks;
