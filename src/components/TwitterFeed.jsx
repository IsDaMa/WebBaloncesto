import React, { useEffect } from "react";
import SocialCard from "./SocialCard";

const TwitterFeed = () => {
  useEffect(() => {
    // Carga el script de X si no existe
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Recarga widgets si el script ya existe
      window.twttr?.widgets.load();
    }
  }, []);

  return (
    <SocialCard name="X" icon="/assets/icons/x.svg">
      <a
        className="twitter-timeline"
        data-height="400"
        data-theme="light"
        data-chrome="nofooter noborders"
        href="https://twitter.com/CB_Cartama?ref_src=twsrc%5Etfw"
      >
        Tweets by CB_Cartama
      </a>
    </SocialCard>
  );
};

export default TwitterFeed;
