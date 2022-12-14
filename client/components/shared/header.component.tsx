import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRequest } from "../../hooks/use-request";
import { User } from "../../types/user.types";

type Props = {
  user?: User;
};

const Header: FC<Props> = ({ user }) => {
  const router = useRouter();
  const { doRequest: logout } = useRequest({
    method: "post",
    url: "/api/users/logout",
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  return (
    <div className="navbar narbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Tickets App</a>
        </Link>

        {user ? (
          <div className="d-flex flex-row">
            <div className="nav-item">
              <span
                className="nav nav-link pointer"
                onClick={() => router.push("/tickets/create")}
              >
                Sell Tickets
              </span>
            </div>
            <div className="nav-item">
              <span
                className="nav nav-link pointer"
                onClick={() => router.push("/orders")}
              >
                My Orders
              </span>
            </div>

            <div className="nav-item">
              <span className="nav nav-link pointer" onClick={() => logout()}>
                Logout
              </span>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <Link href="/auth/login" className="nav-item">
              <a className="nav nav-link">Login</a>
            </Link>

            <Link href="/auth/register" className="nav-item">
              <a className="nav nav-link">Register</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
