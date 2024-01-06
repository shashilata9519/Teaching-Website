import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AlertModal } from "@/common/Modal/AlertModal";
import Link from "next/link";
import { UploadDataModal } from "@/common/Modal/UploadDataModal";
import { Repo } from "@/services/Repo";
import moment from "moment";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { useSearchParams } from "next/navigation";

export default () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [timeLeft, setTimeLeft] = useState(2);

  useEffect(() => {
    console.log(timeLeft);
    var oldtoken = localStorage.getItem("token");
    // if(oldtoken!=""){
    //   router.push('/')
    // }
    // else{
    // }

    if (timeLeft === 2) {
      localStorage.clear();
      //   setTimeLeft(0);
    }
    if (timeLeft === 1) {
      localStorage.setItem("token", searchParams?.get("token") ?? "");
      // localStorage.clear();
      //   setTimeLeft(0);
    }
    if (timeLeft === 0) {
      router.push("/", "/", { shallow: false });
      // localStorage.setItem("token", searchParams?.get("token") ?? "");
      // setTimeLeft(0);
    }
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <>
      <Head>
        <title>Logging you in</title>
      </Head>
      <div className="lg:p-11 p-6  lg:mx-28">
        <div>
          Please wait..
          {timeLeft === 0 && (
            <Link
              prefetch={false}
              href="/"
              className="border bg-red-500 p-2 rounded-lg text-white"
            >
              Proceed !
            </Link>
          )}
          {/* {searchParams.get("token")} */}
        </div>
      </div>
    </>
  );
};
