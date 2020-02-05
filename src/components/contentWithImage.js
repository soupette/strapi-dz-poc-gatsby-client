import React from "react"
import ReactMarkdown from "react-markdown"
import Img from "./image"
import Flex from "./flex"

const Content = ({
  content,
  image_position,
  imageSharp: {
    childImageSharp: { fixed },
  },
}) => {
  return (
    <Flex>
      {image_position === "left" && <Img fixed={fixed} />}
      <ReactMarkdown source={content} style={{ width: 500 }} />
      {image_position === "right" && <Img fixed={fixed} />}
    </Flex>
  )
}

export default Content
