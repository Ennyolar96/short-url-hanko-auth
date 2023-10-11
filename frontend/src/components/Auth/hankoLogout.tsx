import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hanko } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_REACT_APP_HANKO_API_URL;

function LogoutBtn() {
  const navigate = useNavigate();
  const [hanko, setHanko] = useState(new Hanko());

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  const logout = async () => {
    try {
      await hanko?.user.logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      className="bg-[#292929] rounded-sm px-2 py-1 mb-3 ms-1"
      onClick={logout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
