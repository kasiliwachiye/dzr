import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate(`/search/${query}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="navbar bg-secondary">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          dzr
        </NavLink>
      </div>
      <div className="flex-none gap-2">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={query}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
                alt="profile-pic"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
