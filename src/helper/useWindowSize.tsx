import { useEffect, useState } from "react";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 400,
        height: 800,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default useWindowSize