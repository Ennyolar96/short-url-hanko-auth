import { Field, Form, Formik } from "formik";
import { home, homes, cookieValue } from "../utils/input";
import { ToastContainer, toast } from "react-toastify";

const HomeForm = () => {
  const Submit = async (values: homes) => {
    const { url, alias } = values;
    const newAlias = alias === "" ? "itsme" : alias;
    const data = { url, alias: newAlias };

    const req = await fetch("https://bly.vercel.app", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
    });

    const res = await req.json();

    const { success, message } = res;
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <div className="">
        <div>
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
        </div>
        <h5 className="text-[#292929] text-center text-sm">
          Convert Longurl 2 Shorturl
        </h5>
        <Formik
          initialValues={{ url: "", alias: "" }}
          validationSchema={home}
          onSubmit={(value, { resetForm }) => {
            Submit(value);
            resetForm();
          }}
        >
          {({ errors }) => (
            <Form className="flex flex-col">
              <div className="my-2">
                <Field
                  type="text"
                  name="url"
                  className="bg-[#292929] text-base w-full rounded p-2"
                  placeholder="Enter Long URL"
                ></Field>
                <small className="text-red-600">{errors.url}</small>
              </div>

              <div className="my-2">
                <Field
                  type="text"
                  name="alias"
                  className="bg-[#292929] text-base w-full rounded p-2"
                  placeholder="(Optional) Custom Name"
                ></Field>
                <small className="text-red-600">{errors.alias}</small>
              </div>

              <button
                type="submit"
                className="bg-[#292929] mt-3 p-1.5 rounded text-lg hover:bg-[#262b35]"
                disabled={errors.url ? true : false}
              >
                <i className="fa fa-arrow-right font-black "></i>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HomeForm;
