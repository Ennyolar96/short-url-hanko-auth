import { Field, Form, Formik } from "formik";
import { initialValue, regFrom, SignUpValidate } from "../utils/input";
import loginPic from "../../assets/Mobile-login-pana.png";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  // const navigate = useNavigate();

  const Submit = async (values: regFrom) => {
    const response = await toast.promise(
      Auth("http://localhost:8000/register", values),
      {
        pending: "Promise is pending",
        success: "Promise resolved 👌",
        error: "Promise rejected 🤯",
      }
    );
    console.log(response);
    // const response = await ;
    // const { success, message, data } = response;
    // if (success) {
    //   toast.success(message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // navigate("/login");
    // } else {
    //   console.log(message);
    // }
  };

  return (
    <div className="mt-5">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="row row-cols-md-2 row-cols-sm-1 row-cols-1">
        <div className="col">
          <div className="loginScreen">
            <Formik
              initialValues={initialValue}
              validationSchema={SignUpValidate}
              onSubmit={(values, { resetForm }) => {
                Submit(values);
                resetForm();
              }}
            >
              {({ errors }) => (
                <Form className="shadow p-3 rounded">
                  <div className="my-2">
                    <small className="text-danger">{errors.username}</small>
                    <Field
                      type="text"
                      name="username"
                      className="form-control shadow-none"
                      placeholder="Username"
                    ></Field>
                  </div>

                  <div className="my-2">
                    <small className="text-danger">{errors.email}</small>
                    <Field
                      type="email"
                      name="email"
                      className="form-control shadow-none"
                      placeholder="Email"
                    ></Field>
                  </div>

                  <div className="my-2">
                    <small className="text-danger">{errors.password}</small>
                    <Field
                      type="password"
                      name="password"
                      className="form-control shadow-none"
                      placeholder="Password"
                    ></Field>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sm btn-color w-100"
                    disabled={errors.password || errors.email ? true : false}
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-2 text-center">
              <p className="info">
                Already have account?{" "}
                <Link to="/" relative="path">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="col small_screen">
          <div>
            <img src={loginPic} className="w-100 h-100" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
