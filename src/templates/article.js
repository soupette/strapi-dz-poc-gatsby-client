import React from "react"
import { graphql } from "gatsby"
import Content from "../components/content"
import ContentWithImage from "../components/contentWithImage"
import H from "../components/header1"
import Img from "../components/image"
import Layout from "../components/layout"

export const query = graphql`
  query ArticleQuery($id: ID!) {
    strapi {
      article(id: $id) {
        title
        body {
          __typename
          ... on Strapi_ComponentBlogText {
            content
          }
          ... on Strapi_ComponentBlogContentWithImage {
            content
            image {
              url
            }
            imageSharp {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            image_position
          }
          ... on Strapi_ComponentBlogFullSizeImage {
            image {
              url
            }
            imageSharp {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        cover {
          url
        }
        coverSharp {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
const components = {
  Strapi_ComponentBlogText: Content,
  Strapi_ComponentBlogContentWithImage: ContentWithImage,
  Strapi_ComponentBlogFullSizeImage: Img,
}

const Article = ({
  data: {
    strapi: {
      article: {
        coverSharp: {
          childImageSharp: { fluid },
        },
        title,
        body,
      },
    },
  },
}) => {
  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <div style={{ textAlign: "center" }}>
          <div>
            <Img
              style={{ maxHeight: "100%" }}
              imgStyle={{ objectFit: "contain" }}
              fluid={fluid}
            />
          </div>
          <H>{title}</H>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            {body.map((component, key) => {
              const { __typename, ...rest } = component
              const CompoToRender = components[__typename]

              if (!CompoToRender) {
                return null
              }

              return <CompoToRender key={key} {...rest} />
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Article
