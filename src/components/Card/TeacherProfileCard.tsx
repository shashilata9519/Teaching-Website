

export const TeacherProfileCard = ({ img, city ,year,loading}: any) => {
  return (
    <div className={ `p-4 h-full flex  items-center flex-col ${loading?'blur-sm':''}`}>
     
      <div
        className=" h-40 w-40 bg-cover rounded-full mx-auto "
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <p className=" text-base font-bold mb-1 mt-3">Years of Experience: {year}</p>
      {/* <p></p> */}
      <p className="text-base font-bold mb-3">Location: {city}</p>
      {/* <p>,</p> */}
    </div>
  );
};
