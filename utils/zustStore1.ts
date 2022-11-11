import create from "zustand";

type Count = {
  count: number;
  increaseCount:() => void;
  resetCount:() => void;
  overWrite:() => void;
}

export const useZustStore1 = create<Count>((set) => ({
  count:0,
  increaseCount:() => set((state) => {
    return {count: state.count + 1}
  }),
  resetCount: ()=>set({count:0}),
  overWrite:() => set((state)=>{
    return{count:999,
           increaseCount: state.increaseCount,
           resetCount: state.resetCount,
           overWrite: state.overWrite,  
    }},true),
}));


