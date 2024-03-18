import BlogContainer from "@/components/features/blog/blogContainer";
import Layout from "@/components/layouts/privateLayout";
import React from "react";

const Blog = () => {
  return (
    <div className="blog mt-20">
      <BlogContainer />
    </div>
  );
};
Blog.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Blog;
