import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import { CiHome } from "react-icons/ci";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./blogpublish.css";
function BlogPublish() {
  const url = "http://localhost:5000";

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const publishBlog = async () => {
    try {
      if (value && title) {
        const resp = await fetch(`${url}/publishBlog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, content: value }),
        });
        const data = await resp.json();
        if (resp.status === 200) {
          alert(data.data);
          navigate("/");
        } else {
          alert("Blog not published");
        }
      } else {
        alert("write something...");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  var toolbarOptions = [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],

    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ];
  return (
    <>
      <div className="blogpublish">
        <div className="publishContainer">
          <div className="pubIcons">
            <div className="pIcons">
              <Link to="/">
                <CiHome size={30} />
              </Link>
            </div>
            <div className="pIcons" onClick={() => publishBlog()}>
              <HiOutlinePlus size={30} />
            </div>
          </div>
          <div className="editor">
            <div className="pubTitle">
              <h4>Title:</h4>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <ReactQuill
              modules={{
                toolbar: toolbarOptions,
              }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPublish;
