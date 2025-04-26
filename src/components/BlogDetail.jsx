import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "../assets/DeleteConfirm";
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate() 
  const loggedInEmail = sessionStorage.getItem("LoggedInEmail")

  // Delete confirm modal
  const [showModal, setShowModal] = useState(false)
  const [ownerEmail, setOwnerEmail] = useState('');

  const handleDelete = async ()  =>  {
    try {
        navigate('/home')
        await axios.delete(`http://localhost:3000/home/${id}`, {
          data: {
            email: loggedInEmail
          }
        })
        console.log('Blog deleted')
        
    } catch (err) {
        console.log(err)        
    }
  }

  const fetchBlog = async () => {
    await fetch(`http://localhost:3000/home/${id}`)
    .then((res) => {
      if (res.status == 200) {
        console.log("data fetched");
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      setOwnerEmail(data.email)
      setBlog(data);
    });
  } 

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchBlog()
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center m-0">
      <div className="max-w-3xl mx-auto bg-amber-50 p-24 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">
          <span className="text-gray-800">Post Title:</span> {blog.title}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          <span className="font-medium">Post Message:</span> {blog.description}
        </p>
        <p className="font-light text-gray-700 leading-relaxed text-center">
          <span className="font-extralight">date:</span> {blog.date?.substring(0,10)}
        </p>
        <div className="flex flex-row w-auto mt-12 items-center">
        <Link
          className="bg-red-300 p-2 rounded-2xl"
          to={"/home"}
        >
          Go back
        </Link>
        {ownerEmail === loggedInEmail &&
        <button className="bg-red-500 hover:bg-red-600 cursor-pointer text-white text-center ml-24 justify-center mx-auto p-2 rounded-2xl"
        onClick={() =>  setShowModal(true)}
        >
          Delete
        </button>
}
        {
          showModal &&  <DeleteConfirm onConfirm={
            ()=>{
              handleDelete()
              setShowModal(false)
            }
          }
          onCancel={() => setShowModal(false)}
          />
        }
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
