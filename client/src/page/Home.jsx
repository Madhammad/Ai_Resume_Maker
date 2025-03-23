import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CallToAction from "./../components/CallToAction";

// / Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const staggerItems = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const hoverEffect = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const imageLayerAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4 },
  },
};

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const colors = [
    { bg: "bg-sky-800", text: "text-sky-800" },
    { bg: "bg-teal-500", text: "text-teal-500" },
    { bg: "bg-orange-800", text: "text-orange-800" },
    { bg: "bg-indigo-700", text: "text-indigo-700" },
    { bg: "bg-gray-700", text: "text-gray-700" },
    { bg: "bg-yellow-500", text: "text-yellow-500" },
    { bg: "bg-blue-500", text: "text-blue-500" },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full max-w-6xl mx-auto py-8 md:py-12 px-4">
        {/* Text Content */}
        <motion.div
          className="w-full md:basis-[50%] lg:basis-[40%] text-center md:text-left"
          variants={staggerItems}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          ref={ref}
        >
          <motion.h1
            variants={itemAnimation}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 leading-tight"
          >
            Fast & Easy Online Resume Builder and Free PDF Download
          </motion.h1>

          <motion.p
            variants={itemAnimation}
            className="text-sm md:text-base text-green-400 mt-4 mb-6"
          >
            Free to use. Developed by hiring professionals and powered by AI
          </motion.p>

          <motion.p
            variants={itemAnimation}
            className="text-xs sm:text-sm text-slate-500 mb-6 md:mb-8"
          >
            Build beautiful, recruiter-tested resumes in a few clicks! Our
            resume builder is powerful and easy to use, with a range of amazing
            functions. Custom-tailor resumes for any job within minutes.
            Increase your interview chances and rise above the competition
          </motion.p>

          <motion.button
            variants={itemAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg text-sm md:text-base"
          >
            <Link to={currentUser ? "/createCv?tab=cvtemplate" : "/signIn"}>
              Create Your Resume Now
            </Link>
          </motion.button>
          <motion.button
            variants={itemAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg text-sm md:text-base md:ml-3 mt-3"
          >
            <Link to={"/allCVs"}>All Resumes</Link>
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="relative w-full md:basis-[50%] lg:basis-[60%] h-[400px] md:h-[500px] flex justify-center items-center mt-8 md:mt-0"
          initial="hidden"
          animate="visible"
          variants={staggerItems}
        >
          {/* Bottom Layer */}
          <motion.div
            variants={imageLayerAnimation}
            className="absolute inset-0 md:top-[-50px] md:left-32 w-full md:w-[70%] z-0"
          >
            <img
              className="w-full h-full object-contain rounded-lg shadow-xl"
              src="/images/7.PNG"
              alt="Resume Example 2"
            />
          </motion.div>

          {/* Top Layer 1 */}
          <motion.div
            variants={imageLayerAnimation}
            transition={{ delay: 0.2 }}
            className="absolute top-0 -left-5 md:top-0 md:left-16 w-10 md:w-12 z-10"
          >
            <img
              className="w-full h-full object-contain rounded-lg shadow-xl"
              src="/images/1.PNG"
              alt="Resume Example 1"
            />
          </motion.div>

          {/* Top Layer 2 */}
          <motion.div
            variants={imageLayerAnimation}
            transition={{ delay: 0.4 }}
            className="absolute bottom-[10%] right-20 md:bottom-36 md:right-12 w-1/3 md:w-48   z-20"
          >
            <img
              className="w-full h-full object-contain rounded-lg shadow-xl"
              src="/images/5.PNG"
              alt="Resume Example 3"
            />
          </motion.div>

          {/* Color Picker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.6 }}
            className="absolute -top-10 right-0 md:top-[40px] md:right-[-30px] bg-white p-2 rounded-lg shadow-md z-30"
          >
            <h1 className="text-xs md:text-sm font-semibold text-gray-800 mb-2">
              Color
            </h1>
            <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center">
              {colors.map((color) => (
                <motion.div
                  key={color.bg}
                  whileHover={{ scale: 1.1 }}
                  className={`${color.bg} h-4 w-4 md:h-5 md:w-5 rounded-full cursor-pointer transition-shadow hover:shadow-md`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Sections */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full max-w-4xl px-4 md:px-8 my-8 md:my-12"
      >
        <div className="bg-gray-900 rounded-xl p-4 md:p-6 shadow-xl">
          <img
            src="/images/3.PNG"
            className="w-full h-auto rounded-lg"
            alt="Features"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full max-w-4xl px-4 md:px-8 my-8 md:my-12"
      >
        <img
          src="/images/2.PNG"
          className="w-full h-auto rounded-lg shadow-xl"
          alt="Templates"
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg mb-8 md:mb-12 text-sm md:text-base"
      >
        <Link to={"/createCv?tab=cvtemplate"}>Create Your Resume Now</Link>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full max-w-4xl px-4 md:px-8 my-8 md:my-12"
      >
        <CallToAction />
      </motion.div>
    </motion.div>
  );
}
