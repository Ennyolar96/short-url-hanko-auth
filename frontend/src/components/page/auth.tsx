import HankoAuth from "../Auth/hankoAuth";
import loginPic from "../../assets/Sign-in-pana.png";

const UserAuth = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="loginScreen">
        <HankoAuth />
      </div>

      <div className="hidden lg:block">
        <img src={loginPic} className="h-auto max-w-full rounded-lg" alt="" />
      </div>
    </div>
  );
};

// small_screen;
export default UserAuth;
