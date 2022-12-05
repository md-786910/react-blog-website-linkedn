import React, { useEffect, useState } from "react";
import "./blog.css";
import { Link, useParams } from "react-router-dom";
import { CiHome } from "react-icons/ci";
function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const fetchBlog = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getBlogById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await resp.json();

      if (resp.status === 200) {
        setBlog(data.data);
      } else {
        alert("something error happened");
      }
    } catch (error) {
      alert("error.message");
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="blog">
        <div className="blogHead">
          <div className="homeIcon">
            <Link to="/">
              <CiHome size={30} />
            </Link>
          </div>
          <div className="blogContent">
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
