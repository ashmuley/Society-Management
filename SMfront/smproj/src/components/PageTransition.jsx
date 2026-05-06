import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <>
      {/* Diagonal Curtain */}
      {/* <motion.div
        className="diagonal-curtain"
        initial={{ x: "-120%", skewX: "-18deg" }}
        animate={{ x: "120%", skewX: "-18deg" }}
        exit={{ x: "120%", skewX: "-18deg" }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
      /> */}

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, x: 50, filter: "blur(8px)" , ease:"easeOut" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)", ease:"easeOut" }}
        exit={{ opacity: 0, x: -50, filter: "blur(6px)", ease:"easeOut" }}
        transition={{ duration: 0.45 }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default PageTransition;