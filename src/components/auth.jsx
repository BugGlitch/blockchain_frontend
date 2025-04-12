import { useEffect, useRef } from "react";
import MyNav from "./navbar";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const formContainerRef = useRef(null);
  const formCloseBtnRef = useRef(null);
  const signupBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const pwHideIconsRef = useRef([]);
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);

  const openLoginForm = () => {
    homeRef.current?.classList.add("show");
  };

  useEffect(() => {
    const home = homeRef.current;
    const formContainer = formContainerRef.current;
    const formCloseBtn = formCloseBtnRef.current;
    const signupBtn = signupBtnRef.current;
    const loginBtn = loginBtnRef.current;
    const loginForm = loginFormRef.current;
    const signupForm = signupFormRef.current;

    formCloseBtn?.addEventListener("click", () => {
      home?.classList.remove("show");
    });

    pwHideIconsRef.current.forEach((icon) => {
      icon?.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
          getPwInput.type = "text";
          icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
          getPwInput.type = "password";
          icon.classList.replace("uil-eye", "uil-eye-slash");
        }
      });
    });

    signupBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (formContainer) {
        formContainer.classList.add("active");
        signupForm?.classList.add("show");
        loginForm?.classList.remove("show");
      }
    });

    loginBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (formContainer) {
        formContainer.classList.remove("active");
        signupForm?.classList.remove("show");
        loginForm?.classList.add("show");
      }
    });

    const handleLogin = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.success) {
          alert(`✅ ${data.message}\nWallet: ${data.wallet}`);
          home?.classList.remove("show");
          navigate("/dashboard");
        } else {
          alert(`❌ ${data.message}`);
        }
      } catch (error) {
        alert("⚠️ Login failed. Please try again.");
        console.error("Login error:", error);
      }
    };

    const handleSignup = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;
      const walletAddress = e.target.walletAddress.value;

      if (password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, walletAddress }),
        });

        const data = await response.json();
        if (data.success) {
          alert(`✅ ${data.message}`);
          home?.classList.remove("show");
        } else {
          alert(`❌ ${data.message}`);
        }
      } catch (error) {
        alert("⚠️ Signup failed. Please try again.");
        console.error("Signup error:", error);
      }
    };

    if (signupForm) {
      signupForm.addEventListener("submit", handleSignup);
    }

    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }

    return () => {
      if (loginForm) {
        loginForm.removeEventListener("submit", handleLogin);
      }
      if (signupForm) {
        signupForm.removeEventListener("submit", handleSignup);
      }
    };
  }, [navigate]);

  return (
    <>
      <MyNav onLoginClick={openLoginForm} />
      <section className="home" ref={homeRef}>
        <div className="form_container" ref={formContainerRef}>
          <i className="uil uil-times form_close" ref={formCloseBtnRef}></i>

          {/* Login form */}
          <div className="form login_form show" ref={loginFormRef}>
            <form action="#">
              <h2>LogIn</h2>
              <div className="input_box">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />
                <i className="uil uil-envelope-alt email"></i>
              </div>
              <div className="input_box">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  required
                />
                <i className="uil uil-lock password"></i>
                <i
                  className="uil uil-eye-slash pw_hide"
                  ref={(el) => (pwHideIconsRef.current[0] = el)}
                ></i>
              </div>

              <div className="option_feild">
                <span className="checkbox">
                  <input type="checkbox" />
                  <label htmlFor="checkbox">Remember Me</label>
                </span>
                <a href="#" className="forgot_pw">
                  Forgot Password
                </a>
              </div>

              <button type="submit" className="button">Login Now</button>

              <div className="login_signup" style={{ color: "black" }}>
                Don't Have An Account?{" "}
                <a href="#" id="signup" ref={signupBtnRef}>
                  Click Here
                </a>
              </div>
            </form>
          </div>

          {/* Signup form */}
          <div className="form signup_form" ref={signupFormRef}>
            <form action="#">
              <h2>SignUp</h2>
              <div className="input_box">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />
                <i className="uil uil-envelope-alt email"></i>
              </div>
              <div className="input_box">
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  required
                />
                <i className="uil uil-lock password"></i>
                <i
                  className="uil uil-eye-slash pw_hide"
                  ref={(el) => (pwHideIconsRef.current[1] = el)}
                ></i>
              </div>
              <div className="input_box">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
                <i className="uil uil-lock password"></i>
                <i
                  className="uil uil-eye-slash pw_hide"
                  ref={(el) => (pwHideIconsRef.current[2] = el)}
                ></i>
              </div>
              <div className="input_box">
                <input
                  type="text"
                  name="walletAddress"
                  placeholder="Enter Wallet Address/Code"
                  required
                />
                <i className="uil uil-key-skeleton password"></i>
                <i className="uil uil-chain"></i>
              </div>

              <button type="submit" className="button">SignUp Now</button>

              <div className="login_signup" style={{ color: "black" }}>
                Already Have An Account?{" "}
                <a href="#" id="login" ref={loginBtnRef}>
                  Click Here
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Authentication;
