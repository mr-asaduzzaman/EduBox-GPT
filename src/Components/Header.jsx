import { useState } from "react";
import { FaInfoCircle, FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

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
                        className="bg-white rounded-lg p-6 max-w-sm md:max-w-md w-full shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={toggleModal}
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-blue-500">EduBox Express</h2>
                        <p className="text-gray-700 mb-3">
                            A platform designed to make learning fun and engaging.
                        </p>
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">Developer</h3>
                        <p className="text-gray-700 mb-4">
                            <span className="font-semibold">MD. Asaduzzaman Rakib</span>
                            <br /> Passionate Web Developer
                        </p>
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">Follow Us</h3>
                        <div className="flex gap-4 text-2xl  justify-center mb-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="hover:text-blue-700" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="hover:text-blue-400" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="hover:text-gray-800" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="hover:text-blue-600" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
