import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { useReviews } from "@/hooks/useReview";
import useToken from "@/hooks/useToken";
import { useProducts } from "@/hooks/useProducts";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/tabs";
import { Button } from "@/shared/button";
import Rate from "@/components/features/rate";

import type { ApiResponseProductBrandAndCategory, TReview } from "@/services/type";

import { fetcherPatch, fetcherPost } from "@/services/callApiService";

import showToast from "@/utils/showToast";
import isDefined from "@/utils/isDefine";
import { customRound } from "@/utils/mathStar";

import productDes from "@/image/banner/product-video1.webp";
import avatar from "@/image/logo/favico.png";
import star from "@/image/icon/star-svgrepo-com.svg";

interface Props {
  label: string;
  value: string;
}

const Description = () => {
  const tabData: Props[] = [
    { label: "PRODUCT DESCRIPTION", value: "PRODUCT-DESCRIPTION" },
    { label: "ADDITIONAL INFORMATION", value: "ADDITIONAL-INFORMATION" },
    { label: "REVIEW", value: "REVIEW" },
  ];

  const router = useRouter();
  const tokenInfo = useToken();
  const [isStar, setIsStar] = useState<number | null>(null);
  const [starForReview, setStarForReview] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");
  const { products, refreshProducts } = useProducts<ApiResponseProductBrandAndCategory[]>({
    _expand: ["categories", "brands"],
    id: router.query.id,
  });
  const { reviews, refreshReviews } = useReviews<TReview[]>(
    {
      _expand: "userCarts",
      productsId: router.query.id,
    },
    { disable: !router.query.id }
  );

  const { trigger: addReview, isMutating } = useSWRMutation("reviews", fetcherPost);
  const { trigger: updateRate } = useSWRMutation("products", fetcherPatch);

  const handleRatingStar = (id: number) => {
    const newStarState = isStar === id ? null : id;
    setIsStar(newStarState);
  };

  const handleAddReview = async () => {
    if (tokenInfo) {
      if (review && starForReview && reviews) {
        if (products && reviews && starForReview) {
          const averageRate = (products[0].rate + (starForReview + 1)) / 2;
          const numberRound = customRound(averageRate);

          const newProductRate = { rate: numberRound, id: products[0].id };
          await updateRate(newProductRate);
          refreshProducts();
        }
        const dataReview = {
          userCartsId: tokenInfo?.id,
          rate: starForReview && starForReview + 1,
          review: review,
          productsId: router.query.id,
        };
        addReview(dataReview);
        refreshReviews();
        showToast({
          message: "Add review success",
          type: "success",
        });
        setIsStar(null);
        setReview("");
      } else {
        showToast({
          message: "Please rate and write a product review",
          type: "error",
        });
      }
    } else {
      showToast({
        message: "Please log in before reviewing",
        type: "error",
      });
    }
  };

  useEffect(() => {
    setStarForReview(isStar);
  }, [isStar]);

  return (
    <div className="bg-white my-8 shadow-2xl py-8 px-5 rounded-lg">
      <div className="tabs">
        <Tabs defaultValue="PRODUCT-DESCRIPTION" className="w-full m-auto ">
          <div className="flex justify-center items-center mb-6 sm:mb-10">
            <TabsList
              className="w-full gap-5 relative border-b-1 rounded-none py-6 
            xl:w-3/5 nm:w-4/5 sm:bg-transparent 
            md:!w-full md:bg md:mb-10 sm:p-0 sm:h-12 sm:border-none sm:mb-2"
            >
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  className="after:absolute xs:text-xs inline-block px-0 after:left-0 py-3 after:-bottom-1 after:w-full after:h-1 data-[state=active]:after:bg-green-ct5 -translate-y-2/4 md:rounded-none sm:-translate-y-0 font-semibold text-blue-ct7
                   data-[state=active]:bg-white
                   data-[state=active]:text-green-ct5 data-[state=active]:shadow-none sm:after:hidden sm:text-white sm:w-full sm:bg-blue-ct7 sm:data-[state=active]:bg-green-ct5 sm:data-[state=active]:text-white"
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent key="PRODUCT-DESCRIPTION" value="PRODUCT-DESCRIPTION">
            <div className="content-des">
              <h4 className="text-sm font-bold text-blue-ct7">PRODUCT DETAILS</h4>
              <p className="my-4 text-blue-ct7 text-sm font-medium xs:text-xs">
                Apricots Form is an armless modern chair with a minimalistic expression. With a simple and contemporary design Form Chair has a soft
                and welcoming ilhouette and a distinctly residential look. The legs appear almost as if they are growing out of the shell. This gives
                the design flexibility and makes it possible to vary the frame. Unika is a mouth blown series of small, glass pendant lamps,
                originally designed for the Restaurant Gronbech. Est eum itaque maiores qui blanditiis architecto. Eligendi saepe rem ut. Cumque quia
                earum eligendi.
              </p>
              <Image className="w-full rounded-xl mt-4" src={productDes} alt="" />
            </div>
          </TabsContent>

          <TabsContent key="ADDITIONAL-INFORMATION" value="ADDITIONAL-INFORMATION">
            <div className="content-des">
              <p className="my-4 text-blue-ct7 text-sm font-medium xs:text-xs">
                Designed by Puik in 1949 as one of the first models created especially for Carl Hansen & Son, and produced since 1950. The last of a
                series of chairs wegner designed based on inspiration from antique chinese armchairs. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia eserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, aque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
              <h4 className="text-sm font-bold text-blue-ct7">PRODUCT DETAILS</h4>
              <ul className="text-blue-ct7 text-sm mt-4 xs:text-xs">
                <li>Material: Plastic, Wood</li>
                <li>Legs: Lacquered oak and black painted oak</li>
                <li>Length: 48cm</li>
                <li>Depth: 52cm</li>
                <li>Weight: 1lb</li>
                <li>Color: White</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent key="REVIEW" value="REVIEW">
            {
              <div className="review">
                <h4 className="text-blue-ct7 font-semibold">
                  <span>{reviews ? reviews.length : "0"}</span> review for {products && products[0].title}
                </h4>
                <div className="comment-review">
                  {isDefined(reviews) && reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="comment-client border-t-1 py-4 flex gap-2 mt-3">
                        <Image src={avatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="content">
                          <h4 className="text-sm font-semibold text-blue-ct7 flex gap-2 items-center">
                            <span>{review.userCarts.name}</span>
                            {/* <ul className="flex gap-0.5">
                              {Array(review.rate)
                                .fill(null)
                                .map((_, index) => (
                                  <li key={index}>
                                    <Image src={star} alt="star" className="w-3.5 h-3.5 grayscale-0" />
                                  </li>
                                ))}
                              {[...Array(Math.max(5 - review.rate, 0))].map((_, index) => (
                                <li key={index + review.rate}>
                                  <Image src={star} alt="star" className="w-3.5 h-3.5 grayscale" />
                                </li>
                              ))}
                            </ul> */}
                            <Rate rating={review.rate} />
                          </h4>
                          <p className="text-sm text-blue-ct7 font-medium mt-1">{review.review}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3 className="text-center text-blue-ct7 py-5">{"There are no reviews yet"}</h3>
                  )}
                </div>
                <div className="post-review border-t-1">
                  <h3 className="text-blue-ct7 font-semibold my-3">Add a review</h3>
                  <div className="pt-4 gap-2 flex items-center mb-3">
                    <h3 className="text-blue-ct7 font-semibold text-sm">Your rating</h3>
                    <ul className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <li key={index}>
                          <Image
                            onClick={() => handleRatingStar(index)}
                            key={index}
                            src={star}
                            alt="star"
                            className={`w-4 h-4 cursor-pointer ${isStar !== null && index <= isStar ? "grayscale-0" : "grayscale"}`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="content w-full">
                    <div className="flex items-center gap-2 pt-3">
                      <Image src={avatar} alt="" className="rounded-full w-12 h-12" />
                      <div className="w-full">
                        <textarea
                          value={review}
                          onChange={(e) => {
                            setReview(e.target.value);
                          }}
                          className="w-full h-12 border-0 bg-gray-100 outline-0 text-sm pl-3 pt-3 rounded-lg"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end w-full mt-3">
                      <Button
                        disabled={isMutating}
                        onClick={handleAddReview}
                        className="hover:opacity-100 hover:bg-green-ct5 py-3 duration-500 sm:py-4 xs:text-xs xs:py-3"
                      >
                        POST REVIEW
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Description;
