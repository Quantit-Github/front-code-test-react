import React, { useState, useEffect } from "react";
import BaseView from "@views/base";
import { ApiMap } from "../api";
import { LoginAction } from "../store/action";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SnsDivider } from "@asset/sns_divider.svg";
import { ReactComponent as Facebook } from "@asset/facebook.svg";
import { ReactComponent as Twitter } from "@asset/twitter.svg";

function LoginView() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const submitLogin = async () => {
    const res = await ApiMap.login({ username, password });
    LoginAction({ ...res.data, username });
    alert('로그인에 성공하셨습니다.')
    if (res.status) {
      navigate("/dashboard", { replace: true });
    }

    // ID: admin, PWD: quantit4321
  };
  useEffect(() => {
    if (username && password) {
      setIsActive(true);
      return;
    }
    setIsActive(false);
  }, [username, password]);
  return (
    <BaseView type={"page"}>
      <div id="login">
        {/* TODO. 1 로그인 페이지 디자인 및 로그인 기능 구현 */}
        <span className="title">Login</span>
        <div className="panel">
          <form onSubmit={submitLogin}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              placeholder="User Name"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Password"
            />
          </form>
          <button
            className={isActive ? "active" : ""}
            type="submit"
            onClick={submitLogin}
          >
            Login
          </button>
          <span>
            Don't have an account?
            <span> SignUp</span>
          </span>

          <SnsDivider />
          <div className="sns">
            <Facebook />
            <Twitter />
          </div>
        </div>
      </div>
    </BaseView>
  );
}

export default LoginView;
