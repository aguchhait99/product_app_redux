import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({title, children}) => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        {/* title */}
        <title>{title}</title>
      </Helmet>
      <Navbar/>
      <main className="font-[Poppins] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen" style={{height: 'auto'}}>
        {children}
      </main>
      <Footer/>
    </>
  );
};

Layout.defaultProps={
    title: 'Product App'
}

export default Layout;
