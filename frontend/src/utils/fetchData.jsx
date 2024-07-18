import { useEffect, useState } from "react";
const hostUrl = import.meta.env.VITE_API_URL;
const requestHeader = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.token}`,
  },
};
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
    defaultQueryOptions: {},
  },
  sellers: {
    endPoint: "sellers/",
    defaultQueryOptions: {},
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
      fetch(`${hostUrl}/api/${queryString()}`, requestHeader)
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
