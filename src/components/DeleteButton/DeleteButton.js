import React from "react";
import "./style.css"; // Import your CSS file

const DeleteButton = () => {
  const handleClick = (e) => {
    const button = e.target;
    if (!button.classList.contains("delete")) {
      button.classList.add("delete");
      setTimeout(() => button.classList.remove("delete"), 3200);
    }
    e.preventDefault();
  };

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="stylesheet" href="style.css" />
          <title>ELDash - Delete Button Animation</title>
        </head>
        <body>
          <button className="button" onClick={handleClick}>
            <div className="trash">
              <div className="top">
                <div className="paper"></div>
              </div>
              <div className="box"></div>
              <div className="check">
                <svg viewBox="0 0 8 6">
                  <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
                </svg>
              </div>
            </div>
            <span>Delete Item</span>
          </button>
        </body>
      </html>
    );
  }

export default DeleteButton;
