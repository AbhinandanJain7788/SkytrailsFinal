


import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./CountryList.css"; // Ensure you create this CSS file for styling

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch countries");
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCountries.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentCountries = filteredCountries.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleLike = (index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: (prevLikes[index] || 0) + 1,
    }));
  };

  const handleAddComment = (index, newComment) => {
    if (newComment.trim() === "") return;
    setComments((prevComments) => ({
      ...prevComments,
      [index]: [...(prevComments[index] || []), newComment],
    }));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="countries-container">
      <h1>Countries List</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="countries-grid">
        {currentCountries.map((country, index) => (
          <div key={index} className="country-card">
            <h2>{country.name.common}</h2>
            <p>Region: {country.region}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <img src={country.flags.png} alt={country.name.common} className="flag" />

            {/* Like Button */}
            <button className="like-btn1" onClick={() => handleLike(index)}>
              👍 Like {likes[index] || 0}
            </button>

            {/* Comment Section */}
            <div className="comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(index, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <ul>
                {(comments[index] || []).map((comment, i) => (
                  <li key={i}>{comment}</li>
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

export default CountriesList;









