import { ReactComponent as Facebook } from "@asset/facebook.svg";
import { ReactComponent as SnsDivider } from "@asset/sns_divider.svg";
import { ReactComponent as Twitter } from "@asset/twitter.svg";
import BaseView from "@views/base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ApiMap } from "src/api";
import styled from "styled-components";
import { LoginAction } from "src/store/action";

const LoginHeader = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 0.02em;
    color: #29a19c;
`;

const Input = styled.input`
    all: unset;
    width: 100%;
    height: 39px;
    border: 1px solid rgba(40, 40, 70, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 0 16px;
    margin-bottom: 12px;
`;

const LoginButton = styled.button`
    all: unset;
    width: 92px;
    height: 42px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.01em;
    background: #cecece;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const SignupWrapper = styled.p`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.01em;
`;

const SnsWrapper = styled.div`
    display: flex;

    & > div:first-child {
        margin-right: 20px;
    }
`;

const ImageWrapper = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 4px;
    overflow: hidden;
`;

function LoginView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        const { value } = e.target;

        setEmail(value);
    };

    const handlePwChange = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    const handleClickButton = (e) => {
        ApiMap.login({
            username: email,
            password,
        })
            .then((res) => {
                const refresh = res.data.refresh;
                const token = res.data.access;
                // 로그인 성공
                if (res.status === 200) {
                    alert("로그인 성공");
                    dispatch(
                        LoginAction({
                            refresh,
                            token,
                            username: email,
                        })
                    );
                    navigate("/dashboard");
                }

                // 로그인 실패
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            handleClickButton();
        }
    };

    return (
        <BaseView type={"page"}>
            <div id="login">
                <LoginHeader>Login</LoginHeader>
                <Input
                    value={email}
                    placeholder="E-mail"
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePwChange}
                    onKeyPress={handleEnterPress}
                />
                <LoginButton onClick={handleClickButton}>Login</LoginButton>
                <SignupWrapper>
                    Don’t have an account?
                    <Link to="/signup">Sign up</Link>
                </SignupWrapper>
                <SnsDivider />
                <SnsWrapper>
                    <ImageWrapper>
                        <Facebook />
                    </ImageWrapper>
                    <ImageWrapper>
                        <Twitter />
                    </ImageWrapper>
                </SnsWrapper>
            </div>
        </BaseView>
    );
}

export default LoginView;
