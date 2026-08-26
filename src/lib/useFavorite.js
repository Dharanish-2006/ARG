import { useCallback, useEffect, useState } from "react";

const KEY = "avatar-realty:favorites";

function read() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return new Set();
  }
}

export function useFavorite(propertyId) {
  const [favorites, setFavorites] = useState(read);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const isFavorite = favorites.has(propertyId);

  const toggle = useCallback(() => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(propertyId)) next.delete(propertyId);
      else next.add(propertyId);
      return next;
    });
  }, [propertyId]);

  return { isFavorite, toggle };
}
