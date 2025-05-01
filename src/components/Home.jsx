import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const loggedInUserEmail = sessionStorage.getItem("LoggedInEmail");

  const [blogs, setBlogs] = useState([
    {
      title: "",
      description: "",
      date: ""
    },
  ]);

  const [createBlog, setCreateBlog] = useState(false);
  const [refreshBlog, setRefreshBlog] = useState(false);

  useEffect(() => {
    axios
      .get("https://anonymous-blog-msgs.onrender.com/getPosts")
      .then((blogs) => {
        setBlogs(blogs.data), console.log(blogs.data);
      })
      .catch((err) => console.log(err));
  }, [refreshBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDate = new Date().toISOString();
  
    axios
      .post("https://anonymous-blog-msgs.onrender.com/home", {
        title,
        description,
        email: loggedInUserEmail,
        date: newDate, 
      })
      .then((result) => {
        console.log(result);
        setRefreshBlog(!refreshBlog);
        setTitle(""); 
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-amber-50 min-h-screen px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
        <h2 className="text-center text-2xl font-semibold">
          🧠 Anonymous Community Hub
        </h2>
        <Link
          to="/"
          className="text-xl bg-red-400 hover:bg-red-600 mt-2 sm:mt-0 px-4 py-2 rounded-xl cursor-pointer"
        >
          Logout
        </Link>
      </div>
  
      {/* Info and Buttons */}
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-base sm:text-lg mb-6">
          Please feel free to share anything without worrying about your identity being exposed :)
        </p>
  
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button
            onClick={() => setCreateBlog(true)}
            className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-amber-950 cursor-pointer"
          >
            Create Post
          </button>
  
          <button
            onClick={() => setCreateBlog(false)}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-2xl cursor-pointer"
          >
            Cancel
          </button>
        </div>
  
        {/* Create Blog Form */}
        {createBlog && (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="flex flex-col">
                <label className="text-lg font-medium">
                  Title <span className="text-xs font-thin">(required)</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter title here..."
                  className="mt-2 px-4 py-2 border rounded-md"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-lg font-medium">
                  Post Message <span className="text-xs font-thin">(required)</span>
                </label>
                <textarea
                  name="description"
                  required
                  placeholder="Enter your text here..."
                  className="mt-2 px-4 py-2 border rounded-md h-32 resize-none"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
  
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-32 py-2 rounded-xl self-center cursor-pointer">
                Create
              </button>
            </form>
          </div>
        )}
      </div>
  
      {/* Blog Grid */}
      <div className="grid gap-8 mt-16 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="p-6 shadow-md rounded-xl bg-gray-100 flex flex-col justify-between h-64 text-center"
          >
            <p className="text-xl font-semibold truncate">
              Title: <span className="text-[17px] font-normal">{blog.title}</span>
            </p>
            <p className="text-lg truncate mt-2">
              Description: {blog.description}
            </p>
            <p className="text-sm mt-2">
              Date: {blog.date?.substring(0, 10)}
            </p>
            <Link
              to={`/home/${blog._id}`}
              className="mt-6 bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-lg mx-auto"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Home;
