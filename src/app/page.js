"use client"
import Trello from "@/components/Trello";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext)
  return (
    <>
    <div className="w-full text-center">
      <h1 className=" mx-auto text-6xl ">Advance Todo</h1>
    </div>


    <Trello/>
    </>
  );
}
