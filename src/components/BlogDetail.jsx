import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
    const {id} = useParams()

const [blog, setBlog] = useState({
    title: "",
    description: ""
})

useEffect(() => {
    fetch(`http://localhost:3000/home/${id}`).then((res) => {if(res.status == 200){
        console.log('data fetched')
        return res.json()
    }})
    .then((data) =>  {
        console.log(data)
        setBlog(data)
    })
}, [id])


  return (
    <div className="max-w-3xl mx-auto mt-24 bg-amber-50 rounded-2xl shadow-md p-10">
  <h1 className="text-3xl font-semibold text-center mb-6">
    <span className="text-gray-800">Blog Title:</span> {blog.title}
  </h1>
  <p className="text-lg text-gray-700 leading-relaxed text-center">
    <span className="font-medium">Blog Message:</span> {blog.description}
  </p>
</div>
  )
}

export default BlogDetail