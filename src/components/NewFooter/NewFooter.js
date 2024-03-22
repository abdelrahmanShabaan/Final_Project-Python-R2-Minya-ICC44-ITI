import React from "react";
import "./NewFooter.css"; 

function NewFooter() {
  return (
    <div className="xfooterx">
      <div className="bodyfooter">
        <footer className="footerfooter">
          <div className="background">
            <img className="svgfooter" src="/FooterBackground.svg" alt="Footer" />
          </div>

          <section className="sectionfooter">
            <ul className="socialsfooter">
              <li>
                <a href="https://www.instagram.com/hassan.eldash/">
                  <i className="ri-instagram-fill icon"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hassaneldash/">
                  <i className="ri-linkedin-box-fill icon"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/hassaneldash">
                  <i className="ri-github-fill icon"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Hassan_ELDash">
                  <i className="ri-twitter-x-fill icon"></i>
                </a>
              </li>
            </ul>
            <ul className="linksfooter">
              <li className="lifooter">
                <a className="afooter">Home</a>
              </li>
              <li className="lifooter">
                <a className="afooter">About</a>
              </li>
              <li className="lifooter">
                <a className="afooter">Services</a>
              </li>
              <li className="lifooter">
                <a className="afooter">Team</a>
              </li>
              <li className="lifooter">
                <a className="afooter">Contact</a>
              </li>
            </ul>
            <p className="legalfooter">© 2023 All rights reserved - ELDash</p>
          </section>
        </footer>
      </div>
    </div>
  );
}

export default NewFooter;
