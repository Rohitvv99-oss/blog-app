import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});
  console.log(blogs);
  useEffect(() => {
    const fetchblogs = async () => {
      let token = localStorage.getItem("jwt");
      const parsedToken = token ? JSON.parse(token) : undefined;
      console.log("id", id);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/blog/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              token: parsedToken,
            },
          }
        );
        console.log(data);
        setblogs(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Please fill in all fields");
      }
    };
    fetchblogs();
  }, [id]);
  return (
    <div>
      <div>
        <div>
          {blogs && (
            <section className="container mx-auto p-4 ">
              <div className="text-blue-500 uppercase text-xs font-bold mb-4">
                {blogs?.category}
              </div>
              <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
              <div className="flex items-center mb-6">
                <img
                  src={blogs?.adminPhoto?.url}
                  alt="author_avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-lg font-semibold">{blogs?.adminName}</p>
              </div>

              <div className="flex flex-col md:flex-row">
                {blogs?.blogImage && (
                  <img
                    src={blogs?.blogImage?.url}
                    alt="mainblogsImg"
                    className="md:w-1/3 w-400 h-[400px] mb-4 rounded-lg shadow-lg cursor-pointer border"
                  />
                )}
                <div className="md:w-1/2 w-full md:pl-6">
                  <p className="text-lg mb-6">{blogs?.about}</p>
                  {/* Add more content here if needed */}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;