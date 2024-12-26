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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8 sm:mb-12 
            animate-fade-in-down">
            Legal Notice
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8">
            <p className="text-gray-700 text-lg sm:text-xl mb-12 leading-relaxed transition-all duration-300 
              hover:text-gray-900">
              This Legal Notice governs your use of the website and mobile
              application (collectively referred to as "Services") operated by{" "}
              <span className="font-semibold text-blue-600">RoomieQ India</span>. 
              By accessing or using our Services, you agree to comply with the terms 
              outlined below. If you do not agree, please refrain from using our Services.
            </p>

            {legalSections.map((section, index) => (
              <div key={index} 
                className="mb-12 transform transition-all duration-300 hover:translate-x-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 
                  border-l-4 border-blue-500 pl-4">
                  {section.title}
                </h2>
                <div className="text-gray-700 text-lg sm:text-xl leading-relaxed pl-4">
                  {section.content}
                </div>
              </div>
            ))}

            <div className="mt-16 border-t pt-8">
              <p className="text-gray-600 text-center text-lg">
                For any questions or concerns regarding this Legal Notice, please
                contact us at{" "}
                <a
                  href="mailto:support@roomieqindia.com"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors 
                    duration-300 font-medium"
                >
                  support@roomieqindia.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <DownloadPromo />
        <Footer />
      </div>
    </div>
  );
}

export default LegalNotice;
