import React from "react"
import { Link } from "gatsby"
import CardCategory from "./cardCategory"
import CardTitle from "./cardTitle"
import Img from "./image"

const Card = ({ categoryName, fluid, title, slug }) => {
  return (
    <Link to={`/article/${slug}`} className="uk-link-reset">
      <div className="uk-card uk-card-muted">
        <div className="uk-card-media-top">
          <Img fluid={fluid} />
          {/* <img
            src={`${cover.url}`}
            alt={cover.name}
            // height="100"
            // style={{ height: 100 }}
          /> */}
        </div>
        <div className="uk-card-body">
          <CardCategory className="uk-text-uppercase">
            {categoryName}
          </CardCategory>
          <CardTitle className="uk-text-large">{title}</CardTitle>
        </div>
      </div>
    </Link>
  )
}

export default Card
