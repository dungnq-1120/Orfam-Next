import React from "react";

import BlogContainer from "@/components/features/blog/blogContainer";
import PublicLayout from "@/components/layouts/publicLayout";
import { ToastContainer } from "react-toastify";

const Blog = () => {
  return (
    <div className="blog mt-20">
      <ToastContainer />
      <BlogContainer />
    </div>
  );
};
Blog.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default Blog;
