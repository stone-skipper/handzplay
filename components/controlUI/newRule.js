import { useControlsStore, useRulesStore } from "../../lib/store";
import styles from "./panels.module.scss";
import { useEffect, useState } from "react";
import Divider from "../UI/controls/divider";
import WheelPicker from "react-simple-wheel-picker";

export default function NewRules() {
  const [controlToggle, setControlToggle] = useState(false);
  const [valueGroups, setValueGroups] = useState({
    title: "Mr.",
    firstName: "Micheal",
    secondName: "Jordan",
  });

  const handleChange = (name, value) => {
    setValueGroups((valueGroups) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
    }));
  };

  const setKeyValue = (arr) => {
    return arr.map((item) => {
      const dataSet = {
        id: item,
        value: item,
      };
      return dataSet;
    });
  };

  const newOptionGroups = (optionGroups) => {
    let groups = {};
    for (const group in optionGroups) {
      groups[group] = setKeyValue(optionGroups[group]);
    }
    return groups;
  };
  const optionGroups = {
    title: ["Mr.", "Mrs.", "Ms.", "Dr."],
    firstName: ["John", "Micheal", "Elizabeth"],
    secondName: ["Lennon", "Jackson", "Jordan", "Legend", "Taylor"],
  };

  const opGroups = newOptionGroups(optionGroups);

  let pickerColumn = [];
  const handleOnChange = (target) => {
    console.log(target);
  };
  for (const group in opGroups) {
    const data = opGroups[group];

    // pickerColumn.push(
    //   <StyledWheelPicker
    //     data={data}
    //     onChange={handleOnChange}
    //     height={400}
    //     width={100}
    //     titleText="Enter value same as aria-label"
    //     itemHeight={36}
    //     selectedID={data[0].id}
    //     color="#999999"
    //     activeColor="#fff"
    //     backgroundColor="black"
    //     shadowColor="none"
    //   />
    // );
    pickerColumn.push(
      <WheelPicker
        data={data}
        onChange={handleOnChange}
        height={300}
        width={100}
        titleText="Enter value same as aria-label"
        itemHeight={36}
        selectedID={data[0].id}
        color="lightgrey"
        activeColor="blue"
        backgroundColor="white"
        shadowColor="none"
        fontSize={14}
      />
    );
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <p style={{ width: "50%" }}>trigger</p>
        <p style={{ width: "50%" }}>result</p>
      </div>
      <div style={{ display: "flex" }} className={styles.picker}>
        {pickerColumn}
      </div>
    </>
  );
}
