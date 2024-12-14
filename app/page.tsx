// Import the MDXRemote component for rendering MDX content in Next.js
import { MDXRemote } from "next-mdx-remote/rsc";

// Import the remark plugin for GitHub Flavored Markdown (GFM) support
import remarkGfm from "remark-gfm";

// Node.js modules for file system operations and handling paths
import fs from "fs";
import path from "path";

// gray-matter parses the frontmatter (metadata) from Markdown files
import matter from "gray-matter";

// rehype-highlight for syntax highlighting, and a JavaScript language plugin
import rehypeHighlight from "rehype-highlight";
import langJs from "highlight.js/lib/languages/javascript";

// Import the GitHub-style dark theme for syntax highlighting
import "@/styles/highlight-js/github-dark.css";

// Define options for processing MDX content
const options = {
  mdxOptions: {
    // Add support for GitHub Flavored Markdown (tables, task lists, etc.)
    remarkPlugins: [remarkGfm],

    // Configure syntax highlighting with JavaScript language support
    rehypePlugins: [
      () =>
        rehypeHighlight({
          languages: {
            javascript: langJs, // Specify JavaScript as the language to highlight
          },
        }),
    ],
  },
};

// A helper function to read and parse the MDX file
function getPost() {
  // Read the MDX file from the "markdown" directory
  const markdownFile = fs.readFileSync(
    path.join("markdown", "welcome.mdx"), // Ensure the file exists in this location
    "utf-8" // Specify UTF-8 encoding
  );

  // Use gray-matter to parse the frontmatter (metadata) and content
  const { data: frontMatter, content } = matter(markdownFile);

  // Return the parsed frontmatter and content
  return {
    frontMatter,
    content,
  };
}

// The main React component to render the page
export default function Home() {
  // Get the post content and metadata
  const props = getPost();

  return (
    <div>
      {/* Render the MDX content using the MDXRemote component */}
      <MDXRemote source={props.content} options={options} />
    </div>
  );
}
