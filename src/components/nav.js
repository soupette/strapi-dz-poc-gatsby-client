import React from "react"
import { Link } from "gatsby"

const Nav = ({ siteTitle, categories }) => (
  <div>
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/">{siteTitle}</Link>
            </li>
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {categories.map(({ name, id }) => {
              return (
                <li key={id}>
                  <Link to={`/category/${name}`}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  </div>
)

export default Nav
