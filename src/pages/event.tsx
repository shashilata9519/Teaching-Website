import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { CourseCardv2 } from "@/components/Card/CourseCardv2";
import EventCard from "@/components/Card/EventCard";
import { Repo } from "@/services/Repo";
import { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Event = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await Repo.getAllPosts();

      setEventData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="lg:p-11">
      <Breadcrumb category={"Event"} />
      <div className=" bg-xcool-new-blue-bg h-fit p-5 rounded-md mt-2">
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
          {eventData?.map((event: any) => (
            <div key={event.id}>
              <EventCard
                img={event.image}
                eventName={event.topic}
                para={event?.para}
                link={event?.page_url}
                loading={loading}
                date={event?.start}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Event;
