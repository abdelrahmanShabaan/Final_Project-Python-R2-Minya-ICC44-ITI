import React, { useEffect, useRef, useState } from "react";
import "./Sort.css";

const Sort = ({ items, setSortedItems, mediaType, currentPage = null }) => {
  const sortOptionsRef = useRef(null);
  const [sortedOrder, setSortedOrder] = useState("");

  useEffect(() => {
    setSortedOrder("");
  }, [currentPage]);

  const sortItems = () => {
    const sortOptions = sortOptionsRef.current.querySelectorAll("li");
    const updatedMovies = [...items];
    let newMovies;

    sortOptions.forEach((option) => {
      option.addEventListener("click", () => {
        if (option.dataset.title === "highest_rating") {
          newMovies = updatedMovies.sort((a, b) =>
            a.vote_average > b.vote_average ? -1 : 1
          );
          setSortedOrder("with highest rating");
        } else if (option.dataset.title === "lowest_rating") {
          newMovies = updatedMovies.sort((a, b) =>
            a.vote_average < b.vote_average ? -1 : 1
          );
          setSortedOrder("with lowest rating");
        } else if (option.dataset.title === "newest") {
          newMovies = updatedMovies.sort((a, b) => {
            const aDate = a.first_air_date || a.release_date || "9999-12-31";
            const bDate = b.first_air_date || b.release_date || "9999-12-31";
            return aDate > bDate ? -1 : 1;
          });
          setSortedOrder("of newest date");
        } else if (option.dataset.title === "oldest") {
          newMovies = updatedMovies.sort((a, b) => {
            const aDate = a.first_air_date || a.release_date || "0000-01-01";
            const bDate = b.first_air_date || b.release_date || "0000-01-01";
            return aDate < bDate ? -1 : 1;
          });
          setSortedOrder("of oldest date");
        } else if (option.dataset.title === "most_votes") {
          newMovies = updatedMovies.sort((a, b) => {
            const aVoteCount = a.vote_count || 0;
            const bVoteCount = b.vote_count || 0;
            return aVoteCount > bVoteCount ? -1 : 1;
          });
          setSortedOrder(`with most votes`);
        } else if (option.dataset.title === "least_votes") {
          newMovies = updatedMovies.sort((a, b) => {
            const aVoteCount = a.vote_count || 0;
            const bVoteCount = b.vote_count || 0;
            return aVoteCount < bVoteCount ? -1 : 1;
          });
          setSortedOrder(`with least votes`);
        }

        setSortedItems([...newMovies]);
      });
    });
  };

  return (
    <>
      <div className="sort_dropdown__container dropdown p-2">
        <button
          className="standard__border_radius standard__box_shadow bg-warning border-0 mx-auto px-3 py-2"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={sortItems}
        >
          <i className="fa fa-sort mx-1" aria-hidden="true"></i>
          Sort
        </button>

        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
          ref={sortOptionsRef}
        >
          <li role="button" data-title="highest_rating">
            Highest Rating
          </li>
          <li role="button" data-title="lowest_rating">
            Lowest Rating
          </li>
          <li role="button" data-title="newest">
            Newest
          </li>
          <li role="button" data-title="oldest">
            Oldest
          </li>
          <li role="button" data-title="most_votes">
            Most Voted
          </li>
          <li role="button" data-title="least_votes">
            Least Voted
          </li>
        </ul>
      </div>

      <h6 className="gradient_text text-center m-2 p-2">
        {sortedOrder !== "" ? `Showing ${mediaType} ${sortedOrder}` : ""}
      </h6>
    </>
  );
};

export default Sort;
