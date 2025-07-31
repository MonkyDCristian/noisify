import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "@/utils/mmkv-storage";
import { ActionState } from "@/utils/types";

export type ControlCenterState = {
  saturation: number;
  blur: number;
  noiseStrength: number;
};

export type ControlCenterAction = ActionState<ControlCenterState>;

export const useControlCenterStore = create<
  ControlCenterState & ControlCenterAction
>()(
  persist(
    (set) => ({
      saturation: 0.0,
      setSaturation: (saturation) => set({ saturation }),

      blur: 0,
      setBlur: (blur) => set({ blur }),

      noiseStrength: 0.0,
      setNoiseStrength: (noiseStrength) => set({ noiseStrength }),
    }),
    {
      name: "control-center",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
