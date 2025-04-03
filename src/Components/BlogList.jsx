



import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./BlogList.css"; // CSS file for styling

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [likes, setLikes] = useState({}); // State for tracking likes
  const [comments, setComments] = useState({}); // State for storing comments

  const itemsPerPage = 6;
  // const API_KEY = "6cab50dcfb1742f8b4d180c057d2510b";
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const response = await axios.get("http://localhost:7777/api/blogs");
        const url = `https://newsapi.org/v2/everything?q=technology&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
        const response = await axios.get(url);

        setBlogs(response.data.articles);

        // Initialize likes and comments for each blog
        const initialLikes = {};
        const initialComments = {};
        response.data.articles.forEach((blog) => {
          initialLikes[blog.title] = 0;
          initialComments[blog.title] = [];
        });

        setLikes(initialLikes);
        setComments(initialComments);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBlogs.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Function to handle likes
  const handleLike = (title) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [title]: prevLikes[title] + 1,
    }));
  };

  // Function to handle comment submission
  const handleCommentSubmit = (title, newComment) => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => ({
        ...prevComments,
        [title]: [...prevComments[title], newComment],
      }));
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="blog-container">
      <h1>Indian Blog Posts</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="blog-grid">
        {currentBlogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              <button className="read-more-btn">Read More</button>
            </a>

            {/* Like Button */}
            <div className="blog-actions">
              <button className="like-btn" onClick={() => handleLike(blog.title)}>
                👍 Like ({likes[blog.title]})
              </button>
            </div>

            {/* Comment Section */}
            <div className="comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommentSubmit(blog.title, e.target.value);
                    e.target.value = "";
                  }
                }}
                className="comment-input"
              />
              <ul className="comment-list">
                {comments[blog.title].map((comment, i) => (
                  <li key={i} className="comment-item">{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      )}
    </div>
  );
};

export default BlogList;

















