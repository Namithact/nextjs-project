"use client";
import { useForm } from 'react-hook-form';
import { useState } from "react";

export default function AddBlogForm() {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit } = useForm();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const onSubmit = async (data) => {
    console.log(data)
   try{
    const response = fetch(`${baseUrl}/api/post`,{
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body:JSON.stringify(data),
    })
    if(!response.ok){
      throw new Error('failed to submit')
    }
    const result= await response.json();
    console.log(result);
   }
   catch(error){
    console.log(error)
   }
   
  }
  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Hide Form" : "Add Blog"}
      </button>

      {showForm && (
        <form className="space-y-4 border p-4 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              id="title"
              required
              {...register('title')}
              name="title"
              type="text"
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="content" className="block font-semibold mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your blog here..."
               {...register('content')}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Blog
          </button>
        </form>
      )}
    </div>
  );
}
