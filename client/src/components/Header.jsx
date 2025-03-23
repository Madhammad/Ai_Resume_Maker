// import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { CirclePlus, User } from "lucide-react";
import Logo from "./helper/Logo";

function Header({ handleSignOut }) {
  const { currentUser } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

 

  // console.log(switch1)

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
             
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Logo />
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to={"/"}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    
                  >
                    Home
                  </Link>
                  <Link
                    to={"/allCVs"}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Resumes
                  </Link>
                  <Link
                    to={"/about"}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {currentUser && (
                <Link
                  to={"/createCv?tab=cvtemplate"}
                  className="w-fit h-10 flex items-center gap-2 bg-white dark:bg-slate-600 dark:text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-green-300 dark:hover:bg-green-500"
                  color="gray"
                  pill
                >
                  <CirclePlus />{" "}
                  <span className="hidden md:inline-block">Create CV</span>
                </Link>
              )}
             
              {/* Profile dropdown */}
              {currentUser?.isVerified ? (
                <div className="flex md:order-2">
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className=" p-2  rounded-full hover:text-green-500 focus:outline-none"
                    >
                      <User className=" " />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-600  shadow-lg rounded-2xl z-50">
                        <p className="block px-4 py-2 dark:text-white text-gray-800  hover:bg-gray-300 ">
                          <Link to={"/dashbored?tab=profile"}>
                            {currentUser?.username}
                          </Link>
                        </p>
                        <p className="block px-4 py-2 dark:text-white text-gray-800  hover:bg-gray-300 text-xs border-b ">
                          {currentUser?.email}
                        </p>
                        <p className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-green-500 hover:bg-gray-300 ">
                          <Link to={"/alluserCVs"}>User Resume</Link>
                        </p>
                        <p
                          onClick={() => handleSignOut()}
                          className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-green-500 hover:bg-gray-300 "
                        >
                          Logout
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <button>
                  <Link to={"/signIn"}>Sign In</Link>
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            
            <Link
              to={"/"}
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to={"/allCVs"}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Resumes
            </Link>
            <Link
              to={"/about"}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

    
    </>
  );
}

export default Header;
