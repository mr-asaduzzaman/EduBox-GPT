import { useState } from "react";
import { FaInfoCircle, FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            {/* Header */}
            <div className="header bg-gradient-to-b from-blue-500 to-blue-400 shadow-lg flex justify-between items-center px-4 py-2 text-white">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <img
                        className="h-7 w-7 px-1 bg-white rounded-md border-2 border-white shadow-lg"
                        src="https://i.ibb.co/DgQvtc5/1735787220610-picsay.jpg"
                        alt="EduBox Logo"
                    />
                    <h1 className="text-3xl md:text-3xl font-bold tracking-wide font-serif hover:drop-shadow-lg">
                        EduBox
                    </h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 text-xl">
                    <button
                        onClick={toggleModal}
                        className="rounded-full hover:scale-105 transition duration-300 shadow-md"
                        title="More Info"
                    >
                        <FaInfoCircle />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white h-[70%] rounded-lg p-6 max-w-full  shadow-lg relative overflow-y-scroll"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={toggleModal}
                        >
                            ✖
                        </button>


                        <div className="flex flex-col items-center justify-center mb-6">
                            <img
                                src="https://i.ibb.co.com/C1V23Nc/Edu-Box-Logo-2.png" // Developer's image
                                alt="Developer"
                                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover mr-4"
                            />
                            <div>
                                <h2 className="text-2xl text-center font-bold text-blue-500 mb-1">EduBox Express</h2>
                                <p className="text-gray-700 text-sm">A platform to make learning fun and engaging. </p>
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <img
                                src="https://i.ibb.co.com/4PwqB6Z/Whats-App-Image-2024-12-30-at-5-47-47-PM.jpg" // Developer's image
                                alt="Developer"
                                className="w-24 h-28 rounded-lg border-4 border-blue-500 object-cover mr-4"
                            />
                            <div className="flex flex-col justify-center">
                                <h3 className="text-xl font-semibold text-blue-500 ">Developer</h3>
                                <h2 className="text-2xl font-bold text-blue-500 mb-1">Asaduzzaman Rakib</h2>
                                <p className="text-gray-700 text-sm">Passionate Web Developer, with experience in building interactive web applications and platforms using modern web technologies.</p>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">About EduBox Express</h3>
                        <p className="text-gray-700 mb-4">
                            EduBox Express is a cutting-edge platform that provides an engaging learning experience, offering a variety of
                            educational tools to make learning interactive and fun. It includes tutorials, quizzes, assignments, and more!
                        </p>

                        <h3 className="text-xl font-semibold text-blue-500 mb-2">Features</h3>
                        <ul className="list-disc pl-5 text-gray-700 mb-4">
                            <li>Interactive learning content and tutorials</li>
                            <li>Personalized feedback for students</li>
                            <li>Fun and engaging quizzes to test knowledge</li>
                            <li>Access to learning materials on-the-go</li>
                            <li>Support for students of all levels</li>
                        </ul>

                        {/* Scrollable Content */}
                        <div className="max-h-80 overflow-y-auto">
                            <div className="flex gap-4 text-2xl justify-center mb-3">
                                <a href="https://facebook.com/AsaduzzamanRakib.66" rel="noopener noreferrer">
                                    <FaFacebook className="hover:text-blue-700" />
                                </a>
                                <a href="https://twitter.com" rel="noopener noreferrer">
                                    <FaTwitter className="hover:text-blue-400" />
                                </a>
                                <a href="https://github.com" rel="noopener noreferrer">
                                    <FaGithub className="hover:text-gray-800" />
                                </a>
                                <a href="https://linkedin.com" rel="noopener noreferrer">
                                    <FaLinkedin className="hover:text-blue-600" />
                                </a>
                                {/* WhatsApp Icon */}
                                <a href="https://wa.me/8801627814225" rel="noopener noreferrer">
                                    <FaWhatsapp className="hover:text-green-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Header;
