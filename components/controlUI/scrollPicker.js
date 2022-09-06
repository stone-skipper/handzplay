import { useRulesStore } from "../../lib/store";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./panels.module.scss";
import { useInView } from "react-intersection-observer";

import { motion } from "framer-motion";
import Slider from "react-slick";

export default function ScrollPicker({ label, arrayIndex = null, options }) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const removeProperty = useRulesStore((state) => state.removeProperty);
  const [mouseOn, setMouseOn] = useState(false);
  const [slidesToScroll, setSlidesToScroll] = useState(1);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView === true) {
      updateRuleInProgress(label, options[0], arrayIndex);
    } else {
      console.log(inView);
      console.log("triggerRemove!");
      removeProperty(label, arrayIndex);
    }
  }, [inView]);

  const sliderRef = useRef(null);
  const scroll = useCallback(
    (y) => {
      if (y > 0) {
        return sliderRef?.current?.slickNext(); /// ? <- using description below
      } else {
        return sliderRef?.current?.slickPrev();
      }
    },
    [sliderRef]
  );
  useEffect(() => {
    // const sliderObject = sliderRef.current;
    if (mouseOn === true) {
      window.addEventListener("wheel", (e) => {
        console.log(e);
        scroll(e.deltaY);
      });
    }
  }, [scroll]);

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
    speed: 100,

    beforeChange: function (currentSlide, nextSlide) {
      setCurrent(nextSlide);
      updateRuleInProgress(label, options[nextSlide], arrayIndex);
      //   console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      //   setCurrent(currentSlide);
      //   console.log("after change", currentSlide);
    },
  };

  const [current, setCurrent] = useState(0);
  return (
    <div
      className={styles.slideWrapper}
      ref={ref}
      onMouseEnter={() => {
        setMouseOn(true);
      }}
      onMouseLeave={() => {
        setMouseOn(false);
      }}
    >
      <Slider {...settings} ref={sliderRef}>
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
