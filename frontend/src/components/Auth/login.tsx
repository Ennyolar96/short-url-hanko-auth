import { Field, Form, Formik } from "formik";
import { initialValues, LoginFrom, SignInValidate } from "../utils/input";
import loginPic from "../../assets/Sign-in-pana.png";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Login = () => {
  // const navigate = useNavigate();

  const Submit = async (values: LoginFrom) => {
    const response = await Auth("http://localhost:8000/login", values);
    const { success, message } = response;
    if (success) {
      // navigate("/login");
    } else {
      console.log(message);
    }
  };

  return (
    <div className="mt-5">
      <div className="row row-cols-md-2 row-cols-sm-1 row-cols-1">
        <div className="col">
          <div className="loginScreen">
            <Formik
              initialValues={initialValues}
              validationSchema={SignInValidate}
              onSubmit={(values, { resetForm }) => {
                Submit(values);
                resetForm();
              }}
            >
              {({ errors }) => (
                <Form className="shadow p-3 rounded">
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
                    Login
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              <p className="info">
                Not yet have an account?{" "}
                <Link to="/register" relative="path">
                  Create one
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

export default Login;
