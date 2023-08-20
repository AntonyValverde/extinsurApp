import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header_index from "@/components/compIndex/HeaderComp";
import Nav_index from "@/components/compIndex/NavComp";
import Footer_index from "@/components/compIndex/FooterComp";

export default function Home() {
  return (
    <>
      <div className="body">
        <header>
          <Header_index></Header_index>
        </header>

        <article className='navIndex'>
          <Nav_index></Nav_index>
        </article>
        
        <footer className="footerInicio">
          <Footer_index></Footer_index>
        </footer>
      </div>
    </>

  )
}
