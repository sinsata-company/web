import { create } from "zustand";

type Props = {
    hideAppBar: boolean;
    setHideAppBar: (value: boolean) => void;
};

const useUserMenuStore = create<Props>(set => ({
    hideAppBar: false,
    setHideAppBar: (value: boolean) => set({ hideAppBar: value }),
}))

export default useUserMenuStore;
