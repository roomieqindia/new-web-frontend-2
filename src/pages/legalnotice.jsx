import React, { useEffect, useState } from "react";
import DownloadPromo from "../components/DownloadPromo";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

function LegalNotice() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const legalSections = [
    {
      title: "Introduction",
      content:
        "RoomieQ India provides a platform that connects individuals seeking shared living arrangements, including roommates, rooms, hostels, PGs, and bhojanalays. Our Services are intended for users who are at least 16 years old.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content, features, and functionality available through our Services, including but not limited to text, graphics, logos, and software, are the exclusive property of RoomieQ India or our licensors and are protected by copyright, trademark, and other intellectual property laws.",
    },
    {
      title: "No Liability",
      content:
        "While we strive to provide accurate and up-to-date information, RoomieQ India makes no warranties or representations regarding the completeness, accuracy, reliability, or availability of the content on our Services. We are not liable for any damages resulting from your reliance on such information.",
    },
    {
      title: "User Responsibility",
      content: (
        <ul className="list-disc pl-5">
          <li>Use the Services only for lawful purposes.</li>
          <li>Not engage in any fraudulent or deceptive practices.</li>
          <li>Respect the rights of other users and individuals.</li>
        </ul>
      ),
    },
    {
      title: "Third-Party Links",
      content:
        "Our Services may contain links to third-party websites or services that are not owned or controlled by RoomieQ India. We are not responsible for the content, privacy policies, or practices of these third-party sites. We encourage you to review the terms and policies of any third-party sites you visit.",
    },
    {
      title: "Governing Laws",
      content:
        "This Legal Notice shall be governed by and construed in accordance with the laws of Maharashtra, without regard to its conflict of law principles. Any disputes arising from or related to this notice shall be resolved in the courts located in Mumbai, Maharashtra.",
    },
    {
      title: "Changes to This Legal Notice",
      content:
        "We reserve the right to modify this Legal Notice at any time. Any changes will be effective immediately upon posting the revised notice on this page, and your continued use of our Services following such changes constitutes your acceptance of the revised notice.",
    },
  ];

  return (
    <div className="sm:h-[1600px] h-[1200px] relative bg-white">
      <Navbar />

      <div className="min-h-screen py-8 px-4 pt-32">
        <div className="mx-auto bg-white p-6 rounded-md">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-24">
            Legal Notice
          </h1>
          <p className="text-gray-600 text-2xl mb-24 text-left">
            This Legal Notice governs your use of the website and mobile
            application (collectively referred to as "Services") operated by{" "}
            <b>RoomieQ India</b>. By accessing or using our Services, you agree
            to comply with the terms outlined below. If you do not agree, please
            refrain from using our Services.
          </p>

          {legalSections.map((section, index) => (
            <div key={index} className="mb-24">
              <h2 className="text-3xl font-semibold text-gray-800 mb-12">
                {section.title}
              </h2>
              <div className="text-gray-600 text-2xl">{section.content}</div>
            </div>
          ))}

          <div>
            <p className="text-gray-600 text-center">
              For any questions or concerns regarding this Legal Notice, please
              contact us at{" "}
              <a
                href="mailto:support@roomieqindia.com"
                className="text-blue-600 underline"
              >
                support@roomieqindia.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <DownloadPromo />
      <Footer />
    </div>
  );
}

export default LegalNotice;
