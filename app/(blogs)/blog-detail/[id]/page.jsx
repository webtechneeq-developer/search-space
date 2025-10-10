import BlogDetails from "@/components/blogs/BlogDetails";
import PageTitle from "@/components/blogs/PageTitle";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import ReadMore from "@/components/common/ReadMore";

export const metadata = {
  title: "Blog Details",
  description: "",
};
export default function page({ params }) {
  const blogItem =
    allBlogs.filter((elm) => elm.id == params.id)[0] || allBlogs[0];
  return (
    <>
      <Header1 />
      <PageTitle />
      <BlogDetails blogItem={blogItem} />
      <SeoLinks/>
      <ReadMore />
      <Footer1 />
    </>
  );
}
