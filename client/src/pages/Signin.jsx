import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data));
        return navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side div */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-sky-blue dark:via-turquoise dark:to-sunflower">
              Seven&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is demo project. You can sign in with your password and mail
            address or you can use Google.
          </p>
        </div>

        {/* right side div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username">Username</Label>
              <TextInput
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <Label value="Password">Password</Label>
              <TextInput
                type="password"
                id="password"
                placeholder="**********"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-2">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>

          <div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
