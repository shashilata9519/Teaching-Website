interface PropsType {
  step: any;
  intro: string;
  title: string;
  classstyle:any;
}

export const CourseStep = ({ step, title, intro,classstyle }: PropsType) => {
  return (
    <div className="mt-3 md:my-6 rounded-3xl flex gap-4  md:w-[30%]">
      <div className={`h-28 bg-xcool-new-blue max-[600px]:hidden  ${step==5?' w-6':'w-14'}`} ></div>
      <div className="flex flex-col py-4 px-3">
        {/* <div className=" text-white flex flex-row justify-center w-fit rounded-3xl py-1 px-3 text-start text-xs">Step {step}</div> */}
        <div className={classstyle}>
          Step {step} {title}
        </div>
        <div className=" text-sm ">{intro}</div>
      </div>
    </div>
  );
};
