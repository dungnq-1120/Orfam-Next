import Image from "next/image";
import React from "react";
import blog1 from "../../../../../public/image/banner/blog-bg-1.webp";
import blog2 from "../../../../../public/image/banner/blog-bg-2.webp";
import blog3 from "../../../../../public/image/banner/blog-bg-3.webp";
import blog4 from "../../../../../public/image/banner/blog-bg-4.webp";
const BlogPost = () => {
  const blogs = [
    {
      type: "LIFESTYLE",
      post: "ADMIN",
      time: "SEP 15. 2023",
      title: "Avocado Grilled Salmon, Rich In Nutrients For The Body",
      image: blog1,
    },
    {
      type: "ORGANICS",
      post: "ADMIN",
      time: "SEP 15. 2023",
      title: "The Best Great Benefits Of Fresh Beef For Women's Health",
      image: blog2,
    },
    {
      type: "LIFESTYLE",
      post: "ADMIN",
      time: "SEP 15. 2024",
      title: "Ways To Choose Fruits & Seafoods Good For Pregnancy",
      image: blog3,
    },
    {
      type: "SHOPPING",
      post: "ADMIN",
      time: "SEP 15. 2024",
      title: "Summer Breakfast For The Healthy  Morning With Tomatoes",
      image: blog4,
    },
  ];
  return (
    <>
      <div className="blog-post pb-8">
        <div className="content-heading text-center">
          <h4 className="text-green-ct5 font-medium">~ Read Our Blog ~</h4>
          <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-4">Our Latest Post</h3>
          <p className="text-blue-ct7 text-sm font-medium mb-8">The liber tempor cum soluta nobis eleifend option congue doming quod mazim.</p>
        </div>
        <div className="blogs flex px-8">
          {blogs.map((item, index) => (
            <div key={index} className="blog group overflow-hidden p-3 cursor-pointer">
              <div className="image overflow-hidden rounded-tr-xl rounded-tl-xl">
                <Image src={item.image} alt="" className="w-full h-full duration-500 group-hover:scale-110"/>
              </div>
              <div className="content-blog p-5">
                <h4 className="text-xs">
                  <span className="text-green-ct5 font-semibold">{item.type}</span> - <span className="text-blue-ct7 font-semibold">{item.post}</span>
                  - <span className="text-blue-ct7 font-semibold">{item.time}</span>
                </h4>
                <h3 className="text-base font-semibold mt-2 text-blue-ct7">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
