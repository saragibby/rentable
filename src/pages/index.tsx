import React, { useEffect, useState } from "react";
import CompListings from "@/components/compListings";
import TrendChart from "@/components/trendChart";
import WhereSelector from "@/components/whereSelector";
import { Inter } from "next/font/google";
import { MarketLocation, SearchFor } from "@/types/zillow";

const inter = Inter({ subsets: ["latin"] });

const host = "zillow-com1.p.rapidapi.com";
const marketLocatioPath = "/marketLocation?location=Waterford%2C%20MI";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "e41762b72bmsh270ba4648197d5dp126d0ajsn2aa9f9779326",
    "x-rapidapi-host": "zillow-com1.p.rapidapi.com",
  },
};

export default function Home() {
  const [searchFor, setSearchFor] = useState<SearchFor>({
    location: "Waterford, MI",
    bedrooms: "2",
    type: "house",
  });
  const [marketLocation, setMarketLocation] = useState<MarketLocation>(
    {} as MarketLocation
  );
  const [marketData, setMarketData] = useState<any>({});

  useEffect(() => {
    fetch(`https://${host}${marketLocatioPath}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("location data", data);
        setMarketLocation(data.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log("marketLocation in useeffect", marketLocation);
    if (marketLocation.resourceId) {
      console.log("marketLocation.resourceId", marketLocation.resourceId);
      const marketDataPath = `/marketData?resourceId=${marketLocation.resourceId}&beds=2&propertyTypes=house`;

      fetch(`https://${host}${marketDataPath}`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("market data", data);
          setMarketData(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [marketLocation]);

  // const {
  //   medianRentPriceOverTime: { currentYear, prevYear },
  //   zipCodesInCity,
  //   rentHistogram,
  //   rentCompare,
  //   nearByAreas,
  //   nearbyAreaTrends,
  //   marketTemperature,
  //   summary,
  // } = marketData;

  // const medianRent = prevYear.map((item: any, index: number) => {
  //   return {
  //     name: item.month,
  //     previous: item.price,
  //     current: currentYear[index]?.price,
  //   };
  // });

  return (
    <>
      <header className="mt-auto">
        <WhereSelector searchFor={searchFor} setSearchFor={setSearchFor} />
      </header>
      <div className="w-full flex flex-row flex-grow overflow-hidden">
        <div className="w-1/4 flex-shrink npm install recharts p-4">
          <div className="w-3/4">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
              ...menu...
            </ul>
          </div>
        </div>
        <main role="main" className="w-full h-full flex-grow p-6 overflow-auto">
          {/* <div className="flex flex-row justify-between gap-3">
            <div className="flex-grow p-5 bg-gray-700">
              <p className="text-3xl">{summary.availableRentals}</p>
              <span className="text-sm"># listings</span>
            </div>
            <div className="flex-grow p-5 bg-gray-700">
              <p className="text-3xl">{summary.avgDaysOnMarket}</p>
              <span className="text-sm">avg days on market</span>
            </div>
            <div className="flex-grow p-5 bg-gray-700">
              <p className="text-3xl">
                {summary.medianRent.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}
              </p>
              <span className="text-sm">median rent</span>
            </div>
            <div className="flex-grow p-5 bg-gray-700">
              <p className="text-3xl">{marketTemperature.temperature}</p>
              <span className="text-sm">temperature</span>
            </div>
          </div>
          <div className="flex flex-row gap-6 pt-6">
            <TrendChart title="Median Rent" data={medianRent} />
            <CompListings />
          </div> */}
        </main>
      </div>
      <footer className="mt-auto">footer</footer>
    </>
  );
}
