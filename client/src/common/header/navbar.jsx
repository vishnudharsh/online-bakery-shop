import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/auth";
import { useSearch } from "../../components/context/search";
import useCategory from "../../components/hooks/usecategory";
import { useCart } from "../../components/context/cart";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [values, setValues] = useSearch();
  const categories = useCategory();
  const navigate = useNavigate();


  // logout
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // search product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:9000/api/v1/product/search/${values.keyword}`;
    try {
      const { data } = await axios.get(url);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="page-wrapper">
        <header className="header header-intro-clearance header-4">
          <div className="header-top">
            <div className="container">
              <div className="header-left">
                <a href="tel:#">
                  <i className="icon-phone" />
                  Call: +0123 456 789
                </a>
              </div>
              {/* End .header-left */}
              <div className="header-right">
                <ul className="top-menu">
                  <li>
                    <a href="#">Links</a>
                    <ul>
                      <li>
                      </li>
                      {
                        !auth.user ? (<>
                          <li>
                            <a href="/login" style={{ paddingRight: "30px" }}>
                              Sign in
                            </a>
                          </li>
                        </>) : (<>
                          <div className="header-dropdown">
                            <a href="#">Hi, {auth?.user?.name}</a>
                            <div className="header-menu">
                              <ul>
                                <li>
                                  <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink>
                                </li>
                                <li>
                                  <a href="/login" onClick={handleLogout}>Logout</a>
                                </li>
                              </ul>
                            </div>
                            {/* End .header-menu */}
                          </div>
                        </>)
                      }
                      <div className="header-dropdown">
                        <a href="#">English</a>
                        <div className="header-menu">
                          <ul>
                            <li>
                              <a href="#">English</a>
                            </li>
                            <li>
                              <a href="#">French</a>
                            </li>
                            <li>
                              <a href="#">Spanish</a>
                            </li>
                          </ul>
                        </div>
                        {/* End .header-menu */}
                      </div>
                    </ul>
                  </li>
                </ul>
                {/* End .top-menu */}
              </div>
              {/* End .header-right */}
            </div>
            {/* End .container */}
          </div>
          {/* End .header-top */}
          <div className="header-middle">
            <div className="container">
              <div className="header-left">
                <button className="mobile-menu-toggler">
                  <span className="sr-only">Toggle mobile menu</span>
                  <i className="icon-bars" />
                </button>
                <a href="index.html" className="logo">
                  <h5>Nany's Bakery</h5>
                </a>
              </div>
              {/* End .header-left */}
              <div className="header-center">
                <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
                  <a href="#" className="search-toggle" role="button">
                    <i className="icon-search" />
                  </a>
                  <form action="#" method="get" onSubmit={handleSubmit}>
                    <div className="header-search-wrapper search-wrapper-wide">
                      <label htmlFor="q" className="sr-only">
                        Search
                      </label>
                      <button className="btn btn-primary" type="submit">
                        <i className="icon-search" />
                      </button>
                      <input
                        type="search"
                        className="form-control"
                        name="q"
                        id="q"
                        placeholder="Search product ..."
                        value={values.keyword}
                        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                        required
                      />
                    </div>
                    {/* End .header-search-wrapper */}
                  </form>
                </div>
                {/* End .header-search */}
              </div>
              <div className="header-right">
                <div className="dropdown compare-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-display="static"
                    title="Compare Products"
                    aria-label="Compare Products"
                  >
                    <div className="icon">
                      <i className="icon-random" />
                    </div>
                    <p>Compare</p>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <ul className="compare-products">
                      <li className="compare-product">
                        <a href="#" className="btn-remove" title="Remove Product">
                          <i className="icon-close" />
                        </a>
                        <h4 className="compare-product-title">
                          <a href="product.html">Blue Night Dress</a>
                        </h4>
                      </li>
                      <li className="compare-product">
                        <a href="#" className="btn-remove" title="Remove Product">
                          <i className="icon-close" />
                        </a>
                        <h4 className="compare-product-title">
                          <a href="product.html">White Long Skirt</a>
                        </h4>
                      </li>
                    </ul>
                    <div className="compare-actions">
                      <a href="#" className="action-link">
                        Clear All
                      </a>
                      <a href="#" className="btn btn-outline-primary-2">
                        <span>Compare</span>
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                  {/* End .dropdown-menu */}
                </div>
                {/* End .compare-dropdown */}
                <div className="wishlist">
                  <a href="/wishlist" title="Wishlist">
                    <div className="icon">
                      <i className="icon-heart-o" />
                      <span className="wishlist-count badge">3</span>
                    </div>
                    <p>Wishlist</p>
                  </a>
                </div>
                <div className="wishlist">
                  <Link to={'/cart'} title="Cart">
                    <div className="icon">
                      <i className="icon-shopping-cart" style={{ fontSize: '3.2rem' }} />
                      <span className="wishlist-count badge">{cart?.length}</span>
                    </div>
                    <p>Cart</p>
                  </Link>
                </div>
                {/* End .compare-dropdown */}
                {/* <div className="dropdown cart-dropdown">
              <a
                href="/cart"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
              >
                <div className="icon">
                  <i className="icon-shopping-cart" />
                  <span className="cart-count">2</span>
                </div>
                <p>Cart</p>
              </a>
            </div> */}
                {/* End .cart-dropdown */}
              </div>
              {/* End .header-right */}
            </div>
            {/* End .container */}
          </div>
          {/* End .header-middle */}
          <div className="header-bottom sticky-header">
            <div className="container">
              <div className="header-left">
                <div className="dropdown category-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-display="static"
                    title="Browse Categories"
                  >
                    Browse Categories <i className="icon-angle-down" />
                  </a>
                  <div className="dropdown-menu">
                    <nav className="side-nav">
                      <ul className="menu-vertical sf-arrows">
                        {categories?.map((c) => {
                          return (
                            <>
                              <li className="item-lead">
                                <Link to={`/category/${c.slug}`}>{c.name}</Link>
                              </li>
                            </>
                          )
                        })}
                      </ul>
                      {/* End .menu-vertical */}
                    </nav>
                    {/* End .side-nav */}
                  </div>
                  {/* End .dropdown-menu */}
                </div>
                {/* End .category-dropdown */}
              </div>
              {/* End .header-left */}
              <div className="header-center">
                <nav className="main-nav">
                  <ul className="menu sf-arrows">
                    <li className="megamenu-container active">
                      <a href="/">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/shop">
                        Shop
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Elements
                      </a>
                    </li>
                  </ul>
                  {/* End .menu */}
                </nav>
                {/* End .main-nav */}
              </div>
              {/* End .header-center */}
              <div className="header-right">
                <i className="la la-lightbulb-o" />
                <p>
                  Clearance<span className="highlight">&nbsp;Up to 30% Off</span>
                </p>
              </div>
            </div>
            {/* End .container */}
          </div>
          {/* End .header-bottom */}
        </header>
        {/* End .header */}
      </div>
      {/* End .page-wrapper */}
      <div className="mobile-menu-container mobile-menu-light">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close">
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search" onSubmit={handleSubmit}>
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              value={values.keyword}
              onChange={(e) => setValues({ ...values, keyword: e.target.value })}
              required=""
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="mobile-menu-link"
                data-toggle="tab"
                href="#mobile-menu-tab"
                role="tab"
                aria-controls="mobile-menu-tab"
                aria-selected="true"
              >
                Menu
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <ul className="mobile-menu">
                  <li className="active">
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="category.html">Shop</a>
                  </li>
                  <li>
                    <a href="product.html" className="sf-with-ul">
                      Product
                    </a>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                  </li>
                  <li>
                    <a href="elements-list.html">Elements</a>
                  </li>
                </ul>
              </nav>
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a href="#" className="social-icon" target="_blank" title="Facebook">
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Instagram">
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
      {/* End .mobile-menu-container */}
    </>
  )
}
export default Navbar;