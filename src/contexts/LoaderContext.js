import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  // useCallback ensures functions are stable across renders
  const showLoader = useCallback(() => setLoadingCount(c => c + 1), []);
  const hideLoader = useCallback(() => setLoadingCount(c => Math.max(c - 1, 0)), []);

  // derive loading state
  const loading = loadingCount > 0;

  // memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({ showLoader, hideLoader, loading }), [showLoader, hideLoader, loading]);

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(LoaderContext);
};
