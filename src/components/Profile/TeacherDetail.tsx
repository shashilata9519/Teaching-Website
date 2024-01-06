export const TeacherDetail = () => {
  return (
    <>
      <div className="my-4">
        <p className=" text-2xl  font-bold mb-2 opacity-50">
          Account Information
        </p>
        <div className=" grid md:grid-cols-2 gap-3">
          <div className="mb-2">
            <strong>Username </strong>

            <p>Jane.Doe1</p>
          </div>
          <div className="mb-2">
            <strong>Email Address </strong>

            <p>dummy@teacher.in</p>
          </div>
          <div className="mb-2">
            <strong>Phone Number </strong>

            <p>9898989898</p>
          </div>
        </div>
      </div>
      <hr/>
      <form>
        <div className=" grid md:grid-cols-2 gap-5 ">
          <div className="my-4">
            <p className=" text-2xl  font-bold mb-2 opacity-50">
              Degrees & Certifications
            </p>
            <div className=" text-sm mx-8 flex flex-wrap justify-between">
              <p >Vishwakarma University</p>
              <p>B.A.</p>
            </div>
          </div>
          <div className="my-4">
            {/*<p className=" text-2xl  font-bold mb-2 opacity-50">
              Awards & Recognition
            </p>
             <ul className=" text-sm mx-8" style={{ listStyle: "disc" }}>
              <li>Currently Available</li>
              <li>Clases</li>
            </ul> */}
          </div>
        </div>
        <div className="my-5 text-center">
          <a className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer">
            Edit
          </a>
        </div>
      </form>
      <hr />
      <div className="my-4">
        <p className=" text-2xl  font-bold mb-2 opacity-50">Time Slots</p>
        <form>
          <div>

         
        <div className=" flex flex-wrap md:justify-around lg:justify-around justify-evenly flex-col md:flex-row items-center">
          <p className=" font-semibold">Mon</p>
          <p className=" text-sm "> 10:48 am - 12:46 am</p>
          <p className=" text-sm "> 10:48 am - 12:46 am</p>
        </div>
        <div className=" flex flex-wrap md:justify-around lg:justify-around justify-evenly items-center flex-col md:flex-row">
          <p className=" font-semibold">Wed</p>
          <p className=" text-sm "> 10:48 am - 12:46 am</p>
          <p className=" text-sm "> 10:48 am - 12:46 am</p>
        </div>
        <div className="my-5 text-center">
          <a className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer">
            Edit
          </a>
        </div>
        </div>
        </form>
      </div>
    </>
  );
};
