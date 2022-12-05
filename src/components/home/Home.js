import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { BsClipboardPlus } from "react-icons/bs";
function Home() {
  const [blog, setBlog] = useState([]);
  const fetchBlog = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getAllBlog", {
        method: "GET",
      });
      const data = await resp.json();
      if (resp.status === 200) {
        setBlog(data.blog);
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
    <div className="home">
      {blog ? (
        <div className="homeContainer">
          {blog &&
            blog.map((blog, index) => {
              return (
                <div className="cardBlog" key={index}>
                  <Link to={`/${blog._id}`}>
                    <div className="card">
                      <h3>{blog.title}</h3>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      ) : (
        <h1>no blog</h1>
      )}

      <div className="createBlogIcon">
        <Link to="/blog-publish">
          <div className="icon">
            <BsClipboardPlus size={30} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
