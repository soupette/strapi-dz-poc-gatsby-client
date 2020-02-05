import React from "react"
import ReactMarkdown from "react-markdown"

const Content = ({ content }) => {
  return <ReactMarkdown source={content} escapeHtml={false} />
}

export default Content
