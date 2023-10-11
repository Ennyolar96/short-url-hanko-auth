import LogoutBtn from "../Auth/hankoLogout";
import HomeForm from "../home/homeForm";
import { HomeTable } from "../home/table";
import { Drawer } from "vaul";
import { cookieValue } from "../utils/input";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    if (cookieValue === undefined || cookieValue === null)
      return Navigate("/dashboard");
  }, []);

  return (
    <div>
      <div>
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <button className="bg-[#e2e2e2] fixed bottom-5 end-3 py-2 px-3.5 text-lg font-bold text-[#292929] rounded-full">
              <i className="fa fa-plus"></i>
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-[#e2e2e2] flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-[#e2e2e2] rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                <div className="max-w-md mx-auto">
                  <HomeForm />
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>

      <LogoutBtn />
      <div>
        <HomeTable />
      </div>
    </div>
  );
};

export default HomePage;
