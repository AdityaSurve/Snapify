import React from "react";
import Navbar from "../components/Navbar";
import { Banner } from "../components/Banner";
import { Explore } from "../components/Explore";
export default function Home({ newid, setnewid }) {
  return (
    <div className="overflow-x-hidden">
      <Navbar newid={newid} setnewid={setnewid} />
      <div className="flex justify-center">
        <Banner />
      </div>
      <div className="flex justify-center">
        <Explore newid={newid} setnewid={setnewid} />
      </div>
    </div>
  );
}
