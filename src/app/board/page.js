"use client"
import Header from "@/components/Header";
import Trello from "@/components/Trello";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export default function board() {
  const context = useContext(AuthContext)
  return (
    <>
    <Header/>
    <Trello/>
    </>
  );
}
