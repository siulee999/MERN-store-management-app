import { useRef, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useApi from "../api/useApi";


export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  const from = location?.state?.from?.pathname || "/";

  const { setAuth } = useAuth();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [loginError, setLoginError] = useState("");
  const [otherError, setOtherError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const token = await api.login({username: usernameRef.current.value, password: passwordRef.current.value});
      setAuth({ token });
      navigate(from);

    } catch (err) {
      const status = err.response?.status;
      const errMessage = err.response?.data?.message;

      if (status === 401 && errMessage === "Invalid password") {
        setLoginError(errMessage);

      } else if (status === 401) {
        setLoginError(errMessage);

      } else {
        setOtherError("Internal Server Error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="font-bold m-2">Loading...Please wait.</div>
  }

  if (otherError) {
    return <div className="font-bold m-2">{otherError}. Please try again later.</div>
  }

  return (
    <>
      <div className="h-dvh w-dvw flex flex-col justify-center text-primary">
        <div className="px-6 py-12 sm:mx-auto sm:w-full sm:max-w-sm min-w-[300px]">
          <h2 className="text-center text-3xl font-bold mb-5">
            Log In for Data Mutation
          </h2>
          {loginError && <p className="text-red-800 pb-1">{loginError}</p>}
          <div>
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div className="text-lg flex flex-col gap-3">
                <label>
                  <p className="font-medium pb-1">Username</p>
                  <input
                    type="text"
                    ref={usernameRef}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 text-base focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    required
                  />
                </label>

                <label>
                  <p className="font-medium pb-1">Password</p>
                  <input
                    type="password"
                    ref={passwordRef}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 text-base focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md bg-primary px-3 py-1.5 text-base font-semibold text-white shadow-xs hover:bg-primary/80"
              >
                Log in
              </button>
            </form>

            <NavLink to={-1} replace className="block text-center mt-2 underline text-blue-500 text-sm">Back</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
