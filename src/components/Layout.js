import React from "react";
import Navbar from "./Navbar";

function Layout(props) {
  console.log(props);
  return (
    <div>
      <Navbar></Navbar>
      <main style={{ height: "80vh" }}>{props.children}</main>
    </div>
  );
}

export default Layout;
