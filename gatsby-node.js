const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = (
  { actions, cache, createNodeId, createResolvers, store, reporter },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins
  const imageUrlFieldName = "cover"
  const imageFields = ["cover", "image"]
  const schemaName = "Strapi"

  const state = store.getState()
  const schema = state.schemaCustomization.thirdPartySchemas.filter(
    s => s._typeMap[schemaName]
  )[0]

  // console.log(schema)

  if (!schema) {
    throw new Error(`SCHEMA '${schemaName} NOT FOUND'`)
  } else {
    console.log(
      `Found schema '${schemaName}', traversing for fields with name '${imageUrlFieldName}'`
    )
  }

  const typeMap = schema._typeMap
  let resolvers = {}

  for (const typeName in typeMap) {
    const typeEntry = typeMap[typeName]
    const typeFields =
      (typeEntry && typeEntry.getFields && typeEntry.getFields()) || {}
    const typeResolver = {}

    for (const fieldName in typeFields) {
      imageFields.forEach(imgField => {
        if (fieldName === imgField) {
          typeResolver[`${fieldName}Sharp`] = {
            type: "File",
            resolve(source) {
              const sourceURL = source[imgField]
              let url = sourceURL.url

              // const url = sourceURL.url
              if (url) {
                url = sourceURL.url.startsWith("http")
                  ? sourceURL.url
                  : `http://localhost:1337/${sourceURL.url}`
              }

              if (url) {
                return createRemoteFileNode({
                  url,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter,
                })
              }

              return null
            },
          }
        }
      })
    }

    if (Object.keys(typeResolver).length) {
      resolvers[typeName] = typeResolver
    }
  }

  resolvers = Object.keys(resolvers).reduce((acc, current) => {
    if (!current.includes("_edit") && !current.includes("Input")) {
      acc[current] = resolvers[current]
    }

    return acc
  }, {})

  if (Object.keys(resolvers).length) {
    createResolvers(resolvers)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        strapi {
          articles {
            slug
            id
          }
          categories {
            name
            id
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog articles pages.

  const {
    data: {
      strapi: { articles, categories },
    },
  } = result

  articles.forEach(article => {
    createPage({
      path: `/article/${article.slug}`,
      component: require.resolve("./src/templates/article.js"),
      context: {
        id: article.id,
      },
    })
  })

  categories.forEach(category => {
    createPage({
      path: `/category/${category.name}`,
      component: require.resolve("./src/templates/category.js"),
      context: {
        id: category.id,
      },
    })
  })
}