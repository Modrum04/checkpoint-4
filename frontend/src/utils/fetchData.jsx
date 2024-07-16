import { useEffect, useState } from "react";
const hostUrl = import.meta.env.VITE_API_URL;

const queryList = {
  reports: {
    endPoint: "reports?",
    defaultQueryOptions: {
      filterBy: "",
      filterValue: "",
      sortBy: "client.name",
      order: "asc",
    },
  },
  clients: {
    endPoint: "clients/",
  },
  sellers: {
    endPoint: "sellers/",
  },
};

export function fetchData(selectedEndpoint, queryOptions = {}) {
  const [fetchedData, setfetchedData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const queryString = () => {
    let finalQueryOptions = Object.assign(
      {},
      queryList[selectedEndpoint]?.defaultQueryOptions,
      queryOptions,
    );
    return (
      queryList[selectedEndpoint].endPoint +
      Object.entries(finalQueryOptions)
        .map(([key, value]) => (value !== "?" ? `${key}=${value}` : key + value))
        .join("&")
    );
  };

  useEffect(() => {
    try {
      fetch(`${hostUrl}/api/${queryString()}`)
        .then((response) => response.json())
        .then((data) => {
          setfetchedData(data);
          setIsloading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [queryString()]);

  return { fetchedData, isLoading };
}
