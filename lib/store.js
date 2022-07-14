import { useLayoutEffect } from "react";
import create from "zustand";
import produce from "immer";

import createContext from "zustand/context";

let store;

const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  light: false,
  count: 0,
});

const zustandContext = createContext();

export const Provider = zustandContext.Provider;
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore;
export const useCursorStore = create((set) => ({
  hover: "default",
}));

export const useControlsStore = create((set) => ({
  cameraFeed: false,
  handReady: false, // check if the handPose model is ready
  leftHand: false, // check the existence
  rightHand: false, // check the existence
  currentPoseL: "",
  currentPoseR: "",
  handIndicatorType: "skeleton", // skeleton, points, pointer cursor, none
  fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  clearFingersL: () =>
    set((state) => ({ fingersL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })),
  clearFingersR: () =>
    set((state) => ({ fingersR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })),
}));

export const useRulesStore = create((set) => ({
  rules: [
    // {
    //   ifType: "relation",
    //   fingerA: "pinkyL",
    //   fingerB: "pinkyR",
    //   distance: 100,
    //   thenType: "shape",
    //   thenDetail: ["line", "green"],
    // },
    {
      ifType: "pose",
      pose: ["victory", "left"], //type of gesture, left right both
      thenType: "element",
      thenDetail: [
        "rect",
        {
          color: "blue",
          opacity: 1,
          width: 100,
          height: 100,
          radius: 10,
          rotate: 0,
        }, // initial
        {
          color: "white",
          opacity: 1,
          width: 150,
          height: 100,
          radius: 10,
          rotate: 45,
          move: ["y", 20], // 'x' or 'y' as axis / movedistance
        }, //onPose
      ],
    },
    {
      ifType: "relation",
      fingerA: "thumbR",
      fingerB: "indexR",
      distance: 200,
      thenType: "shape",
      thenDetail: ["rect", "black", "fill"],
    },
    // {
    //   ifType: "relation",
    //   fingerA: "thumbR",
    //   fingerB: "indexR",
    //   distance: 20,
    //   thenType: "shape",
    //   thenDetail: ["text", "white", "hello🥰", 80],
    // },
    // {
    //   ifType: "relation",
    //   fingerA: "thumbR",
    //   fingerB: "indexR",
    //   distance: 20,
    //   thenType: "audio",
    //   thenDetail: ["media/drum01.mp3"],
    // },
    // {
    //   ifType: "relation",
    //   fingerA: "thumbR",
    //   fingerB: "indexR",
    //   distance: 20,
    //   thenType: "trace",
    //   thenDetail: ["white"],
    // },
    // {
    //   ifType: "relation",
    //   fingerA: "thumbR",
    //   fingerB: "indexR",
    //   distance: 100,
    //   thenType: "shape",
    //   thenDetail: ["clipping", "rect", "black"],
    // },
  ],
  add: (newRule) => set((state) => ({ rules: [...state.rules, { newRule }] })),
}));

export const initializeStore = (preloadedState = {}) => {
  return create((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    tick: (lastUpdate, light) => {
      set({
        lastUpdate,
        light: !!light,
      });
    },
    increment: () => {
      set({
        count: get().count + 1,
      });
    },
    decrement: () => {
      set({
        count: get().count - 1,
      });
    },
    reset: () => {
      set({
        count: getDefaultInitialState().count,
      });
    },
  }));
};

export function useCreateStore(serverInitialState) {
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === "undefined") {
    return () => initializeStore(serverInitialState);
  }
  // End of server side code

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
}
