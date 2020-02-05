import React from "react"
// import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
// import Nav from "../components/nav"
// // import Image from "../components/image"
// import SEO from "../components/seo"
import Card from "../components/card"
import H1 from "../components/header1"

const IndexPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          strapi {
            articles {
              id
              title
              slug
              cover {
                url
              }
              coverSharp {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              category {
                name
              }
            }
          }
        }
      `}
      render={({ strapi: { articles } }) => {
        const leftArticlesCount = Math.ceil(articles.length / 5)
        const leftArticles = articles.slice(0, leftArticlesCount)
        const rightArticles = articles.slice(leftArticlesCount, articles.length)

        return (
          <div className="uk-section">
            <div className="uk-container uk-container-large">
              <H1>Strapi blog</H1>
              <div>
                <div className="uk-child-width-1-2" data-uk-grid>
                  {leftArticles.map(
                    ({ title, id, category, cover, coverSharp, slug }) => {
                      return (
                        <Card
                          key={id}
                          title={title}
                          categoryName={category.name}
                          fluid={coverSharp.childImageSharp.fluid}
                          slug={slug}
                        />
                      )
                    }
                  )}

                  <div>
                    <div
                      className="uk-child-width-1-2@m uk-grid-match"
                      data-uk-grid
                    >
                      {rightArticles.map(
                        ({ title, id, category, coverSharp, slug }) => {
                          return (
                            <Card
                              key={id}
                              title={title}
                              categoryName={category.name}
                              fluid={coverSharp.childImageSharp.fluid}
                              slug={slug}
                            />
                          )
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  </Layout>
)

export default IndexPage
