import { useEffect, useState } from "react";
import { EmptyArr, cookieValue } from "../utils/input";
import { Logs } from "../utils/dumplog";

// type SetStateAction<S> = S | ((prevState: S) => S);
export const HomeTable = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const copyToClipboard = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);
      alert("Copied");
    } catch (err) {
      alert("Copy Failed");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch("https://bly.vercel.app", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieValue}`,
          },
        });

        const res = await req.json();
        const { data } = res;
        // setData((prev: SetStateAction<any>) => [...prev, data]);
        setData(data);
        setLoading(false);
      } catch (error) {
        Logs(error);
      }
    })();
  });

  return (
    <div className="over_all">
      {loading && <p>Loading...</p>}

      {EmptyArr(data) ? (
        <p className="text-center text-lg mt-4 ">No Data Found!</p>
      ) : (
        <div className="relative overflow-x-auto table_container">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Long URL</th>
                <th className="px-6 py-3">No Of Clicks</th>
                <th className="px-6 py-3">Short URL</th>
                <th className="px-6 py-3">Copy Link</th>
              </tr>
            </thead>
            <tbody className="text-md text-gray-700 dark:text-gray-400">
              {data.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    {item.longURL.length >= 55
                      ? item.longURL.slice(0, 55) + "..."
                      : item.longURL}
                  </td>
                  <td className="px-6 py-4">
                    {item.count >= 10 ? item.count : `0 ${item.count}`}
                  </td>
                  <td className="px-6 py-4">{item.shortURL}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => copyToClipboard(item.shortURL)}
                      className="bg-[#292929] py-1 px-2 rounded-xl text-lg hover:bg-[#262b35]"
                    >
                      <i className="fa fa-copy"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
