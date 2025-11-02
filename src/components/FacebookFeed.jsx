import React, { useEffect, useRef } from "react";

const FacebookFeed = () => {
  const fbRef = useRef(null);

  useEffect(() => {
    const loadFbSdk = () => {
      if (window.FB) {
        window.FB.XFBML.parse(fbRef.current);
        return;
      }

      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/es_ES/sdk.js";
        script.async = true;
        document.body.appendChild(script);
      }

      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v18.0",
        });
        window.FB.XFBML.parse(fbRef.current);
      };
    };

    loadFbSdk();
  }, []);

  return (
    <div ref={fbRef} className="w-full flex justify-center items-center overflow-hidden">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/CB.Cartama"
        data-tabs="timeline"
        data-width="320"
        data-height="400"
        data-small-header="false"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote cite="https://www.facebook.com/CB.Cartama" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/CB.Cartama">Club Baloncesto Cártama</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookFeed;
