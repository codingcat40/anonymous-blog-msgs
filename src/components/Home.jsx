import React, { useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "",
      description: "",
      createdAt: "",
    },
  ]);
  const [createBlog, setCreateBlog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-red-50 min-h-screen">
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
                  placeholder="Enter there"
                  className="mx-8 mt-4"
                />
              </div>

              <div className="mb-8 flex flex-col">
                <label htmlFor="">Blog Message</label>
                <textarea
                  type="text"
                  placeholder="Enter Your blog here..."
                  className="mx-8 mt-4"
                />
              </div>
              <button className="bg-blue-300 w-24 mx-auto rounded-2xl p-2 hover:bg-blue-700">
                Create
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="flex flex-col">{}</div>
    </div>
  );
};

export default Home;
