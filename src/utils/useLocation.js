import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation([latitude, longitude]);
    };

    const errorHandler = (error) => {
      console.error(error);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
};

export default useLocation;
