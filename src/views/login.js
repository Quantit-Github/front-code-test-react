import BaseView from "@views/base";
import { ReactComponent as SnsDivider } from "@asset/sns_divider.svg";
import { ReactComponent as Facebook } from "@asset/facebook.svg";
import { ReactComponent as Twitter } from "@asset/twitter.svg";
import styled from "@emotion/styled";
import { ApiMap } from "../api";
import { useState } from "react";

const isLoginSucced = (respStatus) => {
  if (respStatus === 200) {
    return true;
  }
  return false;
};

function LoginView() {
  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });
  return (
    <BaseView type={"page"}>
      <div id="login">
        <span className="title">Login</span>
        <div className="panel">
          <form>
            <input
              placeholder="E-mail"
              onChange={(e) =>
                setLoginPayload({ ...loginPayload, username: e.target.value })
              }
            ></input>
            <input
              placeholder="Password"
              onChange={(e) =>
                setLoginPayload({ ...loginPayload, password: e.target.value })
              }
            ></input>
          </form>
          <button
            onClick={async () => {
              console.log("loginPayload", loginPayload);
              const result = await ApiMap.login(loginPayload);
              if (isLoginSucced(result.status)) {
                localStorage.setItem("token", result.data.access);
                localStorage.setItem("refresh", result.data.refresh);
                localStorage.setItem("username", loginPayload.username);
              }
            }}
          >
            Login
          </button>
          <span>
            Don’t have an account?
            <a href="#">Sign up</a>
          </span>
          <SnsDivider />
          <div className="sns">
            <Facebook />
            <Twitter />
          </div>
        </div>
        {/* TODO. 1 로그인 페이지 디자인 및 로그인 기능 구현 */}
      </div>
    </BaseView>
  );
}

export default LoginView;
