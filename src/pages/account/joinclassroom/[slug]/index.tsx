import { useRouter } from "next/router";
import Head from "next/head";

import React, { useEffect, useRef, useState } from "react";
import { Repo } from "@/services/Repo";
import { JaaSMeeting,JitsiMeeting } from "@jitsi/react-sdk";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";

export default () => {
  const router = useRouter();

  const token: any =
    typeof window !== "undefined" && localStorage.getItem("token");

  const [jwt, setjwt] = useState("");
  useEffect(() => {
    (async () => {
      const data = await Repo.joinClass(router?.query?.slug, token);
      console.log(data, "join class");
      setjwt(data?.data);
    })();
  }, []);

  console.log(router?.query?.slug);

  return (
    <>
      <Head>
        {" "}
        <title>Join your class</title>
      </Head>
      <div className="h-screen container mx-auto mt-6">
        <Breadcrumb category={"Join Class"} />
        <JitsiMeeting
          // appId={"vpaas-magic-cookie-cabf1df7028948b0a50ab91216d36623"}
          domain={"8x8.vc"}
          roomName={`vpaas-magic-cookie-cabf1df7028948b0a50ab91216d36623/${router?.query?.slug}`}
          // useStaging={true}
          jwt={jwt}
          configOverwrite={{
            disableThirdPartyRequests: true,
            disableLocalVideoFlip: true,
            backgroundAlpha: 0.5,
          }}
          interfaceConfigOverwrite={{
            VIDEO_LAYOUT_FIT: "nocrop",
            MOBILE_APP_PROMO: false,
            TILE_VIEW_MAX_COLUMNS: 4,
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "80%";
          }}
        />
      </div>
    </>
  );
};
