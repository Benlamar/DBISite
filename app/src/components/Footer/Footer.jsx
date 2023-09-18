import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="row pt-4 m-0">
        <div className="col text-center">
            contriuted to IT department
        </div>
        <div className="col text-center">
            Don Bosco Institute
        </div>
      </div>

      <div style={{color:'grey'}} className="text-center p-3">
        copyright@DBI 2022, developed by Bengeorge Lamar
      </div>
    </footer>
  );
};

export default Footer;
