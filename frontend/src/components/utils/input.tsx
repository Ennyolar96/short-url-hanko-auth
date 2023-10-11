import * as Yup from "yup";

// login form details
export const initialValues = {
  email: "",
  password: "",
};

export interface LoginFrom {
  email: string;
  password: string;
}

export const SignInValidate = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Too Short!"),
});

// register form details
export const initialValue = {
  username: "",
  email: "",
  password: "",
};

export interface regFrom {
  username: string;
  email: string;
  password: string;
}

export const SignUpValidate = Yup.object().shape({
  username: Yup.string().required("Enter username"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Too Short!"),
});

// long to short details
export const home = Yup.object().shape({
  url: Yup.string().url("Invalid URL format").required("URL is required"),
  alias: Yup.string(),
});

export interface homes {
  url: string;
  alias: string;
}

export const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("hanko"))
  ?.split("=")[1];

export const EmptyArr = (arr: any) => {
  if (arr !== undefined && arr !== null && arr.length > 0) {
    return false;
  }
  return true;
};
