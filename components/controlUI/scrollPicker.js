import { useRulesStore } from "../../lib/store";

import { useEffect, useState, useRef } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";
import Slider from "react-slick";

export default function ScrollPicker({ label, options }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );

  useEffect(() => {
    updateRuleInProgress(label, options[0]);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
    swipe: true,
    centerMode: true,
    speed: 300,

    beforeChange: function (currentSlide, nextSlide) {
      setCurrent(nextSlide);
      updateRuleInProgress(label, options[nextSlide]);
      console.log(ruleInProgress);
      //   console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      //   setCurrent(currentSlide);
      //   console.log("after change", currentSlide);
    },
  };

  const [current, setCurrent] = useState(0);
  return (
    <div className={styles.slideWrapper}>
      <Slider {...settings}>
        {options.map((data, index) => {
          return (
            <motion.div
              className={styles.swiperSlide}
              key={index}
              animate={{
                opacity: index === current ? 1 : 0.4,
                scale: index === current ? 1.1 : 1,
              }}
            >
              <h3>{data}</h3>
            </motion.div>
          );
        })}
      </Slider>
    </div>
  );
}
