import React from "react";
import Image from "next/image";
import bannerBlog from "@/image/banner/sashimi.jpg";
import blogDetail_1 from "@/image/banner/blog-details-sm-1.webp";
import blogDetail_2 from "@/image/banner/blog-details-sm-2.webp";
import blogDetail_3 from "@/image/banner/blog-details-sm-3.webp";
import BlogComment from "../comment";

const BlogContainer = () => {
  return (
    <div className="blog-container">
      <Image className="w-full p-10 xs:p-5" src={bannerBlog} alt="" />
      <div className="blog-content pl-56 pr-20 py-16 w-[1153px] -translate-y-40 bg-white xl:w-full xl:pl-32 csm:pl-20 csm:-translate-y-0 sm:pl-10 sm:pr-10 xs:!px-5 xs:!py-5">
        <h4 className="text-xs font-semibold">
          <span className="text-green-ct5">ORGANICS </span>-<span className="text-blue-ct7"> ADMIN</span> -
          <span className="text-blue-ct7"> FEB 15. 2024</span>
        </h4>
        <h2 className="text-4xl text-blue-ct7 font-bold mt-3 xs:text-3xl s:!text-2xl">
          Ways To Choose Fruits & Seafoods Good <br className="nm:hidden" /> For Pregnancy
        </h2>
        <p className="text-blue-ct7 font-medium my-5 xs:text-sm">
          These are the people who make your life easier. Large tiles were arranged on the counter top plate near the <br /> window of the living
          room, they were connected to the kitchen. The perfect way to enjoy brewing tea on low <br /> hanging fruit to identify. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p className="text-blue-ct7 font-medium xs:text-sm">
          Large tiles were arranged on the counter top plate near the window of the living room, they were connected <br /> to the kitchen counter
          through the opening in the existing building wall. For me, the most important part of <br /> improving at photography has been sharing it.
          Sign up for an Exposure account, or post regularly to Tumblr, <br /> or both. Tell people you’re trying to get better at photography.
        </p>
        <h4 className="text-blue-ct7 font-medium text-xl my-5 text-center xs:text-base">
          <i>
            “ The disk at the bottom of the bowl can be turned counterclockwise to <br />
            drain water when washing vegetables and it can be turned. ”
          </i>
        </h4>
        <p className="text-blue-ct7 font-medium xs:text-sm">
          Form is an armless modern with a minimalistic expression. With a simple and contemporary design form <br /> Foody has a soft and welcoming
          silhouette and a distinctly residential look. The legs appear almost as if they <br /> are growing out of the shell. This gives the design
          flexibility and makes it possible to vary the frame. Unika is <br /> a mouth blown an series of small, glass pendant lamps, originally
          designed for the restaurant.
        </p>
        <div className="list-image">
          <div className="group-image flex gap-5 my-3 sm:flex-wrap">
            <Image className="rounded-xl sm:w-full" src={blogDetail_1} alt="" />
            <Image className="rounded-xl sm:w-full" src={blogDetail_2} alt="" />
          </div>
          <Image className="rounded-xl mt-3" src={blogDetail_3} alt="" />
        </div>
        <p className="text-blue-ct7 font-medium mt-3 xs:text-sm">
          Staying locked up in four walls have restricted our thinking. I feel like our limited thinking echoes through <br /> this wall. We are so
          used to schedules and predictable life that we have successfully suppressed our creative <br /> side. When you step out of these four walls
          on a peaceful morning, you realize how much nature has to offer <br /> to you. Its boundless. Your thoughts, worries, deadlines won’t
          resonate here.
        </p>
        <p className="text-blue-ct7 font-medium mt-3 xs:text-sm">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam <br /> rem aperiam, eaque
          ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt <br /> explicabo.Nemo enim ipsam voluptatem quia voluptas
          sit aspernatur aut odit aut fugit, sed quia <br />
          consequuntur magni dolores eos qui ratione sequi nesciunt. They’ll come on photo walks with you.
        </p>
        <BlogComment />
      </div>
    </div>
  );
};

export default BlogContainer;
