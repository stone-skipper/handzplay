import { useRulesStore } from "../../lib/store";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./panels.module.scss";

import { motion } from "framer-motion";
import Slider from "react-slick";

export default function ScrollPicker({
  active = true,
  label,
  arrayIndex = null,
  options,
  arrow = false,
}) {
  const ruleInProgress = useRulesStore((state) => state.ruleInProgress);
  const updateRuleInProgress = useRulesStore(
    (state) => state.updateRuleInProgress
  );
  const removeProperty = useRulesStore((state) => state.removeProperty);
  const [mouseOn, setMouseOn] = useState(false);
  const [slidesToScroll, setSlidesToScroll] = useState(1);

  useEffect(() => {
    if (active === true) {
      setCurrent(0);
      updateRuleInProgress(label, options[0], arrayIndex);
    } else {
      setCurrent(null);
    }
  }, [active]);

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

    beforeChange: async function (currentSlide, nextSlide) {
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
      style={{ pointerEvents: active === false ? "none" : "initial" }}
      onMouseEnter={() => {
        setMouseOn(true);
      }}
      onMouseLeave={() => {
        setMouseOn(false);
      }}
    >
      <div
        style={{
          position: "absolute",
          display: arrow === true ? "flex" : "none",
          flexDirection: "column",
          width: "fit-content",
          height: "fit-content",
          justifyContent: "center",
          userSelect: "none",
          textAlign: "center",
          alignItems: "center",
          gap: 10,
          fontSize: "0.8em",
        }}
      >
        <div
          style={{}}
          onClick={() => {
            sliderRef?.current?.slickPrev();
          }}
        >
          ↑
        </div>
        <div
          onClick={() => {
            sliderRef?.current?.slickNext();
          }}
        >
          ↓
        </div>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {options.map((data, index) => {
          return (
            <motion.div
              className={styles.swiperSlide}
              key={index}
              animate={{
                opacity: index === current ? 1 : 0.4,
                scale: index === current ? 1.1 : 1,
                color: index === current ? "#0066FF" : "black",
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
