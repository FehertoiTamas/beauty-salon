import "../[locale]/styles/about-us.css";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-layer"></div>
      <Image
        className="about-image1"
        src="/Images/about-image1.webp"
        width={1080}
        height={1920}
        alt=""
      ></Image>
      <Image
        className="about-image2"
        src="/Images/about-image2.png"
        width={1080}
        height={1080}
        alt=""
      ></Image>
    </section>
  );
};

export default AboutUs;
