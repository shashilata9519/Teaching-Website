import { Heading } from "@/common/Text/Heading";
import { Paragraph } from "@/common/Text/Paragraph";
import { SubHeading } from "@/common/Text/SubHeading";

export default () => {
  return (
    <div>
      <Heading title="About Xcool" align="center" />
      <SubHeading title="Everything you need to know" align="center"/>
      <Paragraph
        title="Xcool is a platform in the creative & arts space that enables learners discover courses and teachers based on profile, competence, objectives, skills and other parameters, helping learners find the right teacher for their requirement. The platform serves as a complete automation solution for teachers to manage & market their profiles, interact and enroll students, schedule live classes and manage payments.
            Xcool is recognized by Department for Promotion of Industry and Internal Trade"
        align="center"
      />
      <Paragraph
        title="Xcool is recognized by Department for Promotion of Industry and Internal Trade"
        align="center"
      />
      <div className="my-5">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/startupindia_xcool.png`}
          alt="startuoindia"
          width="700px"
          className=" mx-auto"
        />
      </div>
      <Paragraph
        title="Xcool will play an important role in empowering and enabling teachers of cultural, creative and arts domains. The platform will play a key role in generating demand for the valuable knowledge & skills disseminated by the community of teachers."
        align="center"
      />
      <SubHeading title="Vision" align="center"/>
      <Paragraph
        title="We envision to be the go-to destination for creative & arts enthusiasts around the world. Through this platform we aim to create a seamless and enjoyable experience for teachers and students to connect and share their passion for music, arts and all things creative."
        align="center"
      />
      <SubHeading title="Mission"align="center" />
      <Paragraph
        title="Our mission is to make creative & arts learning accessible and enjoyable for everyone around the globe at a single destination. We aim to eliminate any barriers to accessing high-quality education in the creative and arts field and provide users with a diverse range of resources, tools, and interactive experiences."
        align="center"
      />
    </div>
  );
};
