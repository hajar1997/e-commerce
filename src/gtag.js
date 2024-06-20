import ReactGA from "react-ga4";

const TRACKING_ID = "G-CZ1B8T12LX";
ReactGA.initialize(TRACKING_ID);

export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
