import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./assets/Header.css"; // Custom CSS for sticky behavior
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./ProductList";
import About from "./About";
import Faq from "./Faq";
import { Home } from "./Home";

const Header = () => {
  const [isNavbarSticky, setNavbarSticky] = useState(false);
  const [isSubmenuSticky, setSubmenuSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("all-product");

  // Refs for sections
  const allProductRef = useRef(null);
  const aboutRef = useRef(null);
  const faqRef = useRef(null);
  const homeRef = useRef(null);
  const productRef = useRef(null);
  const productsRef = useRef(null);

  const handleScroll = () => {
    setNavbarSticky(window.scrollY > 100);
    setSubmenuSticky(window.scrollY > 200);
  };

  // Handle scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll into view function for smooth scrolling
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Use IntersectionObserver to track which section is in view
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.6, // Trigger when 60% of the section is in view
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Store the ref elements in variables
    const allProductElement = allProductRef.current;
    const aboutElement = aboutRef.current;
    const faqElement = faqRef.current;
    const homeElement = homeRef.current;
    const productElement = productRef.current;
    const productsElement = productsRef.current;

    // Observe elements
    if (allProductElement) observer.observe(allProductElement);
    if (aboutElement) observer.observe(aboutElement);
    if (faqElement) observer.observe(faqElement);
    if (homeElement) observer.observe(homeElement);
    if (productElement) observer.observe(productElement);
    if (productsElement) observer.observe(productsElement);

    // Cleanup function to unobserve elements
    return () => {
      if (allProductElement) observer.unobserve(allProductElement);
      if (aboutElement) observer.unobserve(aboutElement);
      if (faqElement) observer.unobserve(faqElement);
      if (homeElement) observer.unobserve(homeElement);
      if (productElement) observer.unobserve(productElement);
      if (productsElement) observer.unobserve(productsElement);
    };
  }, []);

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className={`main-navbar ${isNavbarSticky ? "navbar-sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand to="/">My Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/">Home</Nav.Link>
              <Nav.Link to="/products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Home />

      <div className={`submenu ${isSubmenuSticky ? "submenu-sticky" : ""} border`}>
        <Container fluid>
          <Nav className="justify-content-center">
            <Nav.Link
              onClick={() => scrollToSection(allProductRef)}
              className={activeSection === "all-product" ? "active" : ""}
            >
              All Product
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection(aboutRef)}
              className={activeSection === "about" ? "active" : ""}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection(faqRef)}
              className={activeSection === "faq" ? "active" : ""}
            >
              FAQ
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection(homeRef)}
              className={activeSection === "home" ? "active" : ""}
            >
              Display
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection(productRef)}
              className={activeSection === "product" ? "active" : ""}
            >
              Product
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection(productsRef)}
              className={activeSection === "products" ? "active" : ""}
            >
              Description
            </Nav.Link>
          </Nav>
        </Container>
      </div>

      <div>
        {/* Sections */}
        <section id="all-product" ref={allProductRef} className="section">
          <ProductList />
        </section>
        <section id="about" ref={aboutRef} className="section">
          <div className="my-5">
            <About />
          </div>
        </section>
        <section id="faq" ref={faqRef} className="section">
          <div className="my-5">
            <h1>FAQ</h1>
            <Faq />
          </div>
        </section>
        <section id="home" ref={homeRef} className="section">
          <div className="my-5">
            <h1>Product About</h1>
            <p>Description of the product goes here.</p>
          </div>
        </section>
        <section id="product" ref={productRef} className="section">
          <div className="my-5">
            <h1>Processor</h1>
            <p>Details about the processor.</p>
          </div>
        </section>
        <section id="products" ref={productsRef} className="section">
          <div className="my-5">
            <h1>Product Description</h1>
            <p>Further product details go here.</p>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
