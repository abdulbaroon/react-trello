"use client"
import Header from "@/components/Header";
import HeroHome from "@/components/HeroHome";
import Trello from "@/components/Trello";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext)
  return (
    <>
    <Header/>
    <HeroHome/>
    </>
  );
}
