import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { TbFileCvFilled } from "react-icons/tb";

export const profile = {
  name: `Aniol Juanola Vilalta`,
  headline: `Cybersecurity Researcher`,
  email: `anjuanolavil@gmx.com`,
  location: `Aarhus, Denmark`,
  profileImage: `https://github.com/arand0musernam3.png`,
  links: [
    {
      name: `LinkedIn`,
      url: `https://www.linkedin.com/in/ajuanola`,
      icon: FaLinkedin
    },
    {
      name: `Github`,
      url: `https://github.com/arand0musernam3`,
      icon: FaGithub
    },
    {
      name: `CV (PDF)`,
      url: `/pdf/Aniol_Juanola_Vilalta_CV.pdf`,
      icon: TbFileCvFilled
    }
  ],
  biography: `Hi! I'm <strong>Aniol Juanola Vilalta</strong>, a <em>cybersecurity researcher</em> passionate about <em>cryptography</em>, <em>secure system design</em> and <em>algorithms</em>. I'm currently pursuing an <em>M.S. in Computer Science</em> at <em>Aarhus University</em>, working on multi-party computation and post-quantum cryptography with a thesis in preparation on <em>threshold signing for ML-DSA</em> (FIPS 204). Alongside, I work as an <em>R&amp;D Engineer</em> at <em>Delsys Seidor</em>, where I own access control, identity, logging and vulnerability management for the company's compliance with Spain's National Security Framework (ENS), and lead threat modeling for a new product. I'm looking for a <em>PhD in applied cryptography</em>, in areas such as secure computation, post-quantum cryptography and hardware security.
<div class="my-2"></div>
Before that, I studied <em>Computer Engineering</em> at the <em>University of Girona</em>, graduating with honours at the top of my class (GPA 9.23/10). There I did research at the Graphics &amp; Imaging Laboratory on <i>Starviewer</i>, bringing the radiology viewer to the browser with WebAssembly and training an nnU-Net model to segment spine MRI scans.
<div class="my-2"></div>
Outside of work, I'm an SSI-certified <em>SCUBA Divemaster</em>, a climber, cyclist and overall nature lover. I also tutor high school students on maths, physics and English. Thanks for visiting! Feel free to <a href="mailto:anjuanolavil@gmx.com" target="_blank" rel="noopener noreferrer">reach out</a> to connect.`
};