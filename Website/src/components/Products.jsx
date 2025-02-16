import React from "react";
import Product from "./Product";
import { motion } from "framer-motion";
import { useState } from "react";

const Products = () => {
  const products = [
    {
      title: "Climate Bot",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus repudiandae quam aliquid accusamus ipsam a. Odio, reiciendis alias!",
      live: true,
      case: false,
    },
    {
      title: "Disease Bot",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus repudiandae quam aliquid accusamus ipsam a. Odio, reiciendis alias!",
      live: true,
      case: false,
    },
    {
      title: "Voice Assitance",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus repudiandae quam aliquid accusamus ipsam a. Odio, reiciendis alias!",
      live: true,
      case: true,
    },
    {
      title: "Goverment Schemes",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus repudiandae quam aliquid accusamus ipsam a. Odio, reiciendis alias!",
      live: true,
      case: true,
    },
  ];

  const [position, setPosition] = useState(0);

  const mover = (val) => {
    setPosition(val * 17);
  };

  return (
    <div className="mt-32 relative">
      {products.map((val, index) => (
        <Product key={index} val={val} mover={mover} count={index} />
      ))}
      <div className="w-full h-full absolute top-0 pointer-events-none">
        <motion.div
          initial={{ y: position, x: "-50%" }}
          animate={{ y: position + `rem` }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.6 }}
          className="window absolute w-[26rem] h-[17rem] left-[50%] -traslate-x-[50%] overflow-hidden"
        >
          <motion.div
            animate={{ y: -position + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full bg-sky-300"
          ></motion.div>
          <motion.div
            animate={{ y: -position + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full bg-sky-400"
          ></motion.div>
          <motion.div
            animate={{ y: -position + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full bg-sky-500"
          ></motion.div>
          <motion.div
            animate={{ y: -position + `rem` }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="w-full h-full bg-sky-600"
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
