import { useState, useEffect } from "react";

export function useFetchDataForTab(
  activeTab: string,
  isAuthenticated: boolean | null,
  fetchDataFn: (signal: AbortSignal) => Promise<any>
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (activeTab && !!isAuthenticated) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await fetchDataFn(controller.signal);
          setData(result);
          setError(null);
          setLoading(false);
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
  }, [activeTab, isAuthenticated]);

  return { data, loading, error };
}
