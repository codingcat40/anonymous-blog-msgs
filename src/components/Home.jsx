import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [blogs, setBlogs] = useState([
    {
      title: "",
      description: "",
    },
  ]);

  const [createBlog, setCreateBlog] = useState(false);
  const [refreshBlog, setRefreshBlog] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getPosts")
      .then((blogs) => {
        setBlogs(blogs.data), console.log(blogs.data);
      })
      .catch((err) => console.log(err));
  }, [refreshBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/home", {
        title,
        description,
      })
      .then((result) => {
        console.log(result);
        setRefreshBlog(!refreshBlog);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <h2 className="mx-auto text-center text-2xl">Community Small Blogs</h2>
      <div className="text-center mx-auto">
        <button
          onClick={() => setCreateBlog(true)}
          className="bg-black text-white  w-24 mt-24 py-4 rounded-2xl cursor-pointer hover:bg-amber-950"
        >
          Create Blog
        </button>

        <button
          className="ml-4 bg-white p-2 rounded-4xl cursor-pointer"
          onClick={() => setCreateBlog(false)}
        >
          Cancel
        </button>
        {createBlog && (
          <div className="mt-16 mx-auto w-120 h-72 bg-amber-50">
            <form
              action=""
              onSubmit={handleSubmit}
              className="space-y-8 flex flex-col"
            >
              <div className="mb-8 flex flex-col">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter there"
                  className="mx-8 mt-4"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-8 flex flex-col">
                <label htmlFor="">Blog Message</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Enter Your blog here..."
                  className="mx-8 mt-4"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button className="bg-blue-300 w-24 mx-auto rounded-2xl p-2 hover:bg-blue-700">
                Create
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="text-black grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="m-4 p-4 min-h-fit shadow-md rounded-xl h-64 flex flex-col bg-gray-100 w-104 justify-center text-center"
          >
            <p className="truncate text-2xl">Blog Title: <span className="text-[18px]">{blog.title}</span></p>
            <p className="truncate text-lg">Blog Description: {blog.description}</p>
            <Link
              to={`/home/${blog._id}`}
              className="bg-blue-500 mt-12 hover:bg-blue-800 w-24  h-12 p-2 border rounded-lg text-white mx-auto text-center justify-center"
            >
              Edit
            </Link>
            {/* {console.log(blog)} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
