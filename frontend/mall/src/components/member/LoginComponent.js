import {useState} from "react";
import {useDispatch} from "react-redux";
import {login, loginPostAsync} from "../../slices/loginSlice";
import {useNavigate} from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
    email: '',
    pw: ''
}

const LoginComponent = () => {
    const [loginParam, setLoginParam] = useState({...initState})

    const {doLogin, moveToPath} = useCustomLogin()

    const navigate = useNavigate()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value

        setLoginParam({...loginParam})
    }

    const handleClickLogin = (e) => {

        doLogin(loginParam)
            .then(data => {
                console.log(data);

                if (data && data.error) {
                    alert("이메일과 패스워드를 다시 확인하세요");
                } else if (data) {
                    alert("로그인 성공");
                    navigate({ pathname: '/' }, { replace: true });
                } else {
                    // 예외적인 경우에 대한 추가 처리 (예: 서버와의 연결 문제가 있을 때)
                    alert("로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
                }
            })
            .catch((error) => {
                console.error("로그인 중 에러 발생:", error);
                alert(`로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요. ${error.message}`);
            });
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="email"
                           type={'text'}
                           value={loginParam.email}
                           onChange={handleChange}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-full p-3 text-left font-bold">Password</div>
                        <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                               name="pw"
                               type={'password'}
                               value={loginParam.pw}
                               onChange={handleChange}>
                        </input>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full justify-center">
                        <div className="w-2/5 p-6 flex justify-center font-bold">
                            <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <KakaoLoginComponent/>
        </div>
    );
}

export default LoginComponent