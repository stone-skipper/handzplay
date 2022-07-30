import useInterval from "../lib/useInterval";
import Clock from "./clock";
import Counter from "./counter";
import { useStore } from "../lib/store";

export default function Layout() {
  const { tick } = useStore();

  // Tick the time every second
  useInterval(() => {
    tick(Date.now(), true);
  }, 1000);

  return (
    <>
      <Clock />
      <Counter />
    </>
  );
}
