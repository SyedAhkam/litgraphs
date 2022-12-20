"use client";

import Link from "next/link";
import Drawer from "../components/drawer";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        {isDesktop == false ? (
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        ) : (
          <></>
        )}
      </div>

      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          🔥 LitGraphs
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
