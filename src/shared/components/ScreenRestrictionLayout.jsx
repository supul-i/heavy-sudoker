import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MIN_SCREEN_HEIGHT, MIN_SCREEN_WIDTH, THROTTLE_DELAY } from "../../constants/layout";
import throttle from "../../utils/throttle";
import GuideMessage from "./GuideMessage";

function ScreenRestrictionLayout({ children }) {
  const [windowWidth, setWindowWidth] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);

  useEffect(() => {
    const handleWindowSize = throttle(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }, THROTTLE_DELAY);

    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);

    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return (
    <>
      {windowWidth < MIN_SCREEN_WIDTH || windowHeight < MIN_SCREEN_HEIGHT ? (
        <GuideMessage
          message={"원활한 서비스 이용을 위해 PC에서 접속한 후 화면을 더 크게 조정해주세요."}
        />
      ) : (
        children
      )}
    </>
  );
}

ScreenRestrictionLayout.propTypes = {
  children: PropTypes.node,
};

export default ScreenRestrictionLayout;
