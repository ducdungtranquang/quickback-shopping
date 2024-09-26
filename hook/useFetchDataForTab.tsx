import { useState, useEffect } from "react";

export function useFetchDataForTab(
  activeTab: string,
  fetchDataFn: (signal: AbortSignal) => Promise<any>
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (activeTab) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await fetchDataFn(controller.signal);
          setData(result);
          setError(null);
        } catch (error: any) {
          if (error.name === "AbortError") {
            console.log("Request was cancelled");
          } else {
            setError("Failed to fetch data");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [activeTab]);

  return { data, loading, error };
}
