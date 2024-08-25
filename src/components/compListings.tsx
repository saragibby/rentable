"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const host = "zillow-com1.p.rapidapi.com";
const path =
  "/propertyExtendedSearch?location=Waterford%2C%20MI&status_type=ForRent&home_type=Houses&bedsMin=0&bedsMax=2&daysOn=90&soldInLast=90";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "e41762b72bmsh270ba4648197d5dp126d0ajsn2aa9f9779326",
    "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
  },
};

export default function CompListings() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://${host}${path}`, options);
        if (!response.ok || !response.body) {
          throw response.statusText;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            setLoading(false);
            break;
          }

          const decodedChunk = decoder.decode(value, { stream: true });
          setData((prevValue: any) => ({
            ...prevValue,
            ...JSON.parse(decodedChunk),
          }));
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { props } = data as { props: any };
  console.log("data", data);
  console.log("props", props);

  return (
    <div className="flex-grow">
      <h2>Comp Listings</h2>
      {loading && <p>Loading...</p>}
      {!loading && props && (
        <table className="table-auto w-full">
          {props.map((item: any) => (
            <tr key={item.address}>
              <td>
                <Link
                  href={`https://zillow.com/${item.detailUrl}`}
                  target="_blank"
                >
                  {item.address.split(",")[0]}
                </Link>
              </td>
              <td>{item.livingArea}</td>
              <td>
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}
              </td>
              <td>{item.rentZestimate}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
