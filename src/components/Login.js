"use client"
import submitAction from "@/Actions/submitAction";
import { backgroundSvg, githubSvg, googleSvg } from "@/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { createRef, useState } from "react";


export default function Login({ register }) {
    const [loading,setLoading]=useState(false)
    const ref = createRef()
    const router = useRouter()

    const handleSubmit=async(formData)=>{
        setLoading(true)
        const response = await submitAction(formData,register);
        setLoading(false)
        if (response){
            setLoading(false)
            router.push("/")
            // toast.success('Todo Created');
            ref.current?.reset()
        }else{
           console.log("failed")
        //    toast.error('Error creating toddo');
        }
    }
    return (
        <>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900"
                        style={{
                            backgroundImage:
                                `url(${backgroundSvg.src})`,
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat"
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Sign in with
                                            </h6>
                                        </div>
                                        <div className={`btn-wrapper text-center `}>
                                            <button
                                                className="bg-white active:bg-gray-100 text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                <img
                                                    alt="..."
                                                    className="w-5 mr-1"
                                                    src={githubSvg.src}
                                                />
                                                Github
                                            </button>
                                            <button
                                                className="bg-white active:bg-gray-100 text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                <img
                                                    alt="..."
                                                    className="w-5 mr-1"
                                                    src={googleSvg.src}
                                                />
                                                Google
                                            </button>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-gray-400" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-gray-500 text-center mb-3 font-bold">
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <form action={handleSubmit} ref={ref}>
                                            <div className={`relative w-full mb-3 ${register ? "block" : "hidden"}`}>
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    UserName
                                                </label>
                                                <input
                                                    type="username"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="UserName"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div className={`relative w-full mb-3 ${register ? "block" : "hidden"} `}>
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Conform Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                />
                                            </div>
                                            <div className="hidden">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                                        style={{ transition: "all .15s ease" }}
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                    type="submit"
                                                    style={{ transition: "all .15s ease" }}
                                                    disabled={loading}
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                        </form>
                                <div className="flex flex-wrap mt-6">
                                    <div className="w-1/2">
                                        <a
                                            href="#pablo"
                                            //   onClick={e => e.preventDefault()}
                                            className="text-gray-300"
                                        >
                                            <small className="text-black">Forgot password?</small>
                                        </a>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <Link
                                            href={`${register?"login":"register"}`}
                                            //   onClick={e => e.preventDefault()}
                                            className="text-gray-300"
                                        >
                                            <small className="text-black">{register?"Already have a account":"Create new account"}</small>
                                        </Link>
                                    </div>
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
