import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header_index from "@/components/compIndex/HeaderComp";
import Nav_index from "@/components/compIndex/NavComp";
import Footer_index from "@/components/compIndex/FooterComp";

export default function Home() {
  return (
    <>
      <div className="body" data-testid="div">
        <header data-testid="header-index">
          <Header_index></Header_index>
        </header>
        <div className='navCompIndex' data-testid="navCompIndex">
          <article className='navIndex' data-testid="article">
            <Nav_index></Nav_index>
          </article>
        </div>
        <footer className="footerInicio" data-testid="footer">
          <Footer_index></Footer_index >
        </footer>
      </div>
    </>

  )
}
