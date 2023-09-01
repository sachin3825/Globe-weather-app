import React from "react";

import CustomButton from "../components/CustomButton";

import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src='./world.png'
              alt='logo'
              className='w-8 h-8 object-contain'
            />
          </motion.header>
          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                Weather360: <br className='xl:block hidden' /> Your Globe,
                <br className='xl:block hidden' /> Your Forecast!
              </h1>
            </motion.div>
            <motion.div
              className='flex flex-col gap-5'
              {...headContentAnimation}
            >
              <p className='max-w-md font-normal text-gray-300 text-base'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A aut
                facilis ipsum explicabo saepe laborum dolores corporis quam ab
                qui dolor quaerat quidem perspiciatis aperiam, nobis sapiente
                voluptas animi. Tenetur.
              </p>
              <CustomButton
                type='filled'
                title='Search'
                handleClick={() => (state.intro = false)}
                customStyle='w-fit px-4 py-2.5 font-bold text-sm'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
