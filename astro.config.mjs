// @ts-check
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import sectionizeHeadings from "@mdxvac/remark-sectionize-headings"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import inspectUrls from "@jsdevtools/rehype-url-inspector"

// ChatGPT-generated
function insertLeadingH2(text = "") {
  return (tree) => {
    const children = tree.children

    // skip over MDX import/export nodes
    const firstContentIndex = children.findIndex(
      (n) => !["mdxjsEsm", "import", "export"].includes(n.type),
    )
    if (firstContentIndex === -1) return // empty file

    const first = children[firstContentIndex]
    const isH2 = first.type === "heading" && first.depth === 2
    if (isH2) return // already has one

    // Insert a dummy ## right before the first content node
    children.splice(firstContentIndex, 0, {
      type: "heading",
      depth: 2,
      children: [{ type: "text", value: text }], // keep it empty or give it a label
    })
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://vinayakakv.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [insertLeadingH2, sectionizeHeadings, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      // https://peoray.dev/blog/astro-open-link-new-tab
      [
        inspectUrls,
        {
          selectors: ["a[href]"],
          inspectEach(url) {
            url.node.properties.target = "_blank"
          },
        },
      ],
    ],
    extendDefaultPlugins: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      wrap: true,
      theme: "github-dark-default",
    },
  },
})
