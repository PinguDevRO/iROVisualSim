import { create } from 'zustand';
import { HeadgearModel } from '@/models/get-headgear';
import { GarmentModel } from '@/models/get-garment';
import { persist } from 'zustand/middleware';
import { regular_mount_list, cash_mount_list, third_job } from '@/constants/joblist';
import PostRender from '@/services/post-render';

export type Direction = "Left" | "Right";

export type Character = {
    gender: number;
    job: string[];
    head: number;
    headPalette: number;
    headdir: number;
    headgear: number[];
    garment: number;
    bodyPalette: number;
    action: number;
    canvas: string;
    outfit: number;
};

export type State = {
    _hasHydrated: boolean;
    character_url: string | null;
    character: Character;
    headgear_upper: HeadgearModel | null;
    headgear_middle: HeadgearModel | null;
    headgear_lower: HeadgearModel | null;
    garment: GarmentModel | null;
    cash_mount_checked: number;
    regular_mount_checked: number;

    update_char_url: (character_url: string | null) => void;
    update_char_gender: (gender: number) => void;
    update_char_job: (job: string[]) => void;
    update_char_head: (head: number) => void;
    update_char_headPalette: (headPalette: number) => void;
    update_char_headdir: (headdir: Direction) => void;
    update_char_headgear: (headgear: HeadgearModel | null) => void;
    update_char_garment: (garment: GarmentModel | null) => void;
    update_char_bodyPalette: (bodyPalette: number) => void;
    update_char_action: (action: Direction) => void;
    update_char_movement_action: (action: number) => void;
    update_char_outfit: (outfit: number) => void;

    update_cash_mount: (cash_mount_checked: number) => void;
    update_regular_mount: (regular_mount_checked: number) => void;

    reset_character: () => void;
    reset_upper_headgear: () => void;
    reset_middle_headgear: () => void;
    reset_lower_headgear: () => void;
    reset_garment: () => void;

    load_character: () => void;
};

export const initialState = {
    _hasHydrated: false,
    character_url: null,
    character: {
        gender: 1,
        job: ["0"],
        head: 1,
        headPalette: 1,
        headdir: 0,
        headgear: [0, 0, 0],
        garment: 0,
        bodyPalette: 0,
        action: 0,
        canvas: "200x200+100+150",
        outfit: 0,
    },
    headgear_upper: null,
    headgear_middle: null,
    headgear_lower: null,
    garment: null,
    cash_mount_checked: 0,
    regular_mount_checked: 0,
};

export const useStore = create<State>()(
    persist(
        (set, get) => ({
            ...initialState,

            update_char_url: (character_url: string | null) => set(() => ({ character_url })),
            update_char_gender: async (gender: number) => {
                set((state) => ({ character: { ...state.character, gender } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_job: async (job: string[]) => {
                const cash_mount = get().cash_mount_checked;
                const regular_mount = get().regular_mount_checked;
                const newJob = parseInt(job[0]);

                if([20, 4021, 4069, 4264, 4212, 4305].indexOf(newJob) >= 0){ // Female class only
                    set((state) => ({ character: { ...state.character, gender: 0 } }));
                }

                if([19, 4020, 4068, 4263, 4211, 4304].indexOf(newJob) >= 0){ // Male class only
                    set((state) => ({ character: { ...state.character, gender: 1 } }));
                }

                if(!third_job.some((x) => x.id === newJob)){
                    set((state) => ({ character: { ...state.character, outfit: 0 } }));
                }

                if([4218, 4308].indexOf(newJob) >= 0){ // Checking Doram
                    const head = get().character.head;
                    if(head > 10){
                        set((state) => ({ character: { ...state.character, head: 1 } }));
                    }
                }

                if(cash_mount === 1){
                    let found = false;
                    for (const [strKey, val] of Object.entries(cash_mount_list)) {
                        const key = Number(strKey);
                        if (newJob === key) {
                            set((state) => ({ character: { ...state.character, job: [val.toString()] } }));
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        set((state) => ({ character: { ...state.character, job } }));
                        set(() => ({ cash_mount_checked: 0 }));
                    }
                }

                else if(regular_mount === 1){
                    let found = false;
                    for (const [strKey, val] of Object.entries(regular_mount_list)) {
                        const key = Number(strKey);
                        if (newJob === key) {
                            set((state) => ({ character: { ...state.character, job: [val.toString()] } }));
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        set((state) => ({ character: { ...state.character, job } }));
                        set(() => ({ regular_mount_checked: 0 }));
                    }
                }
                else {
                    set((state) => ({ character: { ...state.character, job } }));
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_head: async (head: number) => {
                set((state) => ({ character: { ...state.character, head } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_headPalette: async (headPalette: number) => {
                set((state) => ({ character: { ...state.character, headPalette } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_headdir: async (headdir: Direction) => {
                const directions = [1, 0, 2];
                const currentHeadDir = get().character.headdir;
                let index = directions.findIndex((x) => x == currentHeadDir);

                if (headdir == "Right") {
                    if (index > 0) {
                        index--;
                        set((state) => ({ character: { ...state.character, headdir: directions[index] } }));
                    }
                }
                else {
                    if (index < 2) {
                        index++;
                        set((state) => ({ character: { ...state.character, headdir: directions[index] } }));
                    }
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_headgear: async (headgear: HeadgearModel | null) => {
                if(headgear === null) return;

                if(headgear.location === 0){ //Upper
                    const currentHeadgear = get().headgear_upper;
                    if(currentHeadgear !== null && currentHeadgear.location === 3){ //Upper & Middle
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[1] = 0;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_middle: initialState.headgear_middle }));
                    }
                    else if(currentHeadgear !== null && currentHeadgear.location === 4){ //Upper & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[2] = 0;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_lower: initialState.headgear_lower }));
                    }
                    else if(currentHeadgear !== null && currentHeadgear.location === 6){ //Upper & Middle & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[1] = 0;
                        newHeadgear[2] = 0;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_middle: initialState.headgear_middle }));
                        set(() => ({ headgear_lower: initialState.headgear_lower }));
                    }
                    else {
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                    }

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(headgear.location === 1){ //Middle
                    const currentHeadgear = get().headgear_middle;
                    if(currentHeadgear !== null && currentHeadgear.location === 3){ //Upper & Middle
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = 0;
                        newHeadgear[1] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: initialState.headgear_upper }));
                        set(() => ({ headgear_middle: headgear }));
                    }
                    else if(currentHeadgear !== null && currentHeadgear.location === 5){ //Middle & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[1] = headgear.accessoryId;
                        newHeadgear[2] = 0;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_middle: headgear }));
                        set(() => ({ headgear_lower: initialState.headgear_lower }));
                    }
                    else if(currentHeadgear !== null && currentHeadgear.location === 6){ //Upper & Middle & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = 0;
                        newHeadgear[1] = headgear.accessoryId;
                        newHeadgear[2] = 0;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: initialState.headgear_upper }));
                        set(() => ({ headgear_middle: headgear }));
                        set(() => ({ headgear_lower: initialState.headgear_lower }));
                    }
                    else {
                        const newHeadgear = get().character.headgear;
                        newHeadgear[1] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_middle: headgear }));
                    }

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(headgear.location === 2){ //Lower
                    const currentHeadgear = get().headgear_lower;
                    if(currentHeadgear !== null && currentHeadgear.location === 4){ //Upper & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = 0;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: initialState.headgear_upper }));
                        set(() => ({ headgear_lower: headgear }));
                    }
                    else if(currentHeadgear !== null && currentHeadgear.location === 5){ //Middle & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[1] = 0;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_middle: initialState.headgear_middle }));
                        set(() => ({ headgear_lower: headgear }));
                    }
                    else if(currentHeadgear !== null && currentHeadgear.location === 6){ //Upper & Middle & Lower
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = 0;
                        newHeadgear[1] = 0;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: initialState.headgear_upper }));
                        set(() => ({ headgear_middle: initialState.headgear_middle }));
                        set(() => ({ headgear_lower: headgear }));
                    }
                    else {
                        const newHeadgear = get().character.headgear;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_lower: headgear }));
                    }

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(headgear.location === 3){ //Upper & Middle
                    const currentLower = get().headgear_lower;
                    if(currentLower !== null && currentLower.location >= 4){
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[1] = headgear.accessoryId;
                        newHeadgear[2] = 0;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_middle: headgear }));
                        set(() => ({ headgear_lower: initialState.headgear_lower }));
                    }
                    else {
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[1] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_middle: headgear }));
                    }

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(headgear.location === 4){ //Upper & Lower
                    const currentMiddle = get().headgear_upper;
                    if(currentMiddle !== null && (currentMiddle.location === 3 || currentMiddle.location >= 5)){
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[1] = 0;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_middle: initialState.headgear_middle }));
                        set(() => ({ headgear_lower: headgear }));
                    }
                    else {
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = headgear.accessoryId;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: headgear }));
                        set(() => ({ headgear_lower: headgear }));
                    }

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(headgear.location === 5){ //Middle & Lower
                    const currentUpper = get().headgear_upper;
                    if(currentUpper !== null && (currentUpper.location === 3 || currentUpper.location === 4 || currentUpper.location === 6)){
                        const newHeadgear = get().character.headgear;
                        newHeadgear[0] = 0;
                        newHeadgear[1] = headgear.accessoryId;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_upper: initialState.headgear_upper }));
                        set(() => ({ headgear_middle: headgear }));
                        set(() => ({ headgear_lower: headgear }));
                    }
                    else {
                        const newHeadgear = get().character.headgear;
                        newHeadgear[1] = headgear.accessoryId;
                        newHeadgear[2] = headgear.accessoryId;
                        set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                        set(() => ({ headgear_middle: headgear }));
                        set(() => ({ headgear_lower: headgear }));
                    }

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(headgear.location === 6){ //Upper & Middle & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = headgear.accessoryId;
                    newHeadgear[1] = headgear.accessoryId;
                    newHeadgear[2] = headgear.accessoryId;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: headgear }));
                    set(() => ({ headgear_middle: headgear }));
                    set(() => ({ headgear_lower: headgear }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else {
                    return;
                }
            },
            update_char_garment: async (garment: GarmentModel | null) => {
                if(garment === null) return;

                set((state) => ({ character: { ...state.character, garment: garment.garmentId } }));
                set(() => ({ garment }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_bodyPalette: async (bodyPalette: number) => {
                set((state) => ({ character: { ...state.character, bodyPalette } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_action: async (action: Direction) => {
                if (action == "Left") {
                    let act = get().character.action;
                    const currentAction = (act + 1) % 8;
                    if (currentAction == 0) {
                        act -= 7;
                        set((state) => ({ character: { ...state.character, action: act } }));
                    } else {
                        act++;
                        set((state) => ({ character: { ...state.character, action: act } }));
                    }
                } else {
                    let act = get().character.action;
                    const currentAction = act % 8;
                    if (currentAction == 0) {
                        act += 7;
                        set((state) => ({ character: { ...state.character, action: act } }));
                    } else {
                        act--;
                        set((state) => ({ character: { ...state.character, action: act } }));
                    }
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_movement_action: async (action: number) => {
                let act = get().character.action;
                const currentAction = act % 8;
                act = action + currentAction;
                if (act < 0) {
                    act = 0;
                }

                set((state) => ({ character: { ...state.character, action: act } }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_char_outfit: async (outfit: number) => {
                set((state) => ({ character: { ...state.character, outfit } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },

            update_cash_mount: async (cash_mount_checked: number) => {
                set(() => ({ cash_mount_checked }));
                const currentJob = parseInt(get().character.job[0]);
                if (cash_mount_checked === 1) {
                    for (const [strKey, val] of Object.entries(cash_mount_list)) {
                        const key = Number(strKey);
                        if (currentJob === key) {
                            set((state) => ({ character: { ...state.character, job: [val.toString()] } }));
                            break;
                        }
                    }
                }
                else {
                    for (const [strKey, val] of Object.entries(cash_mount_list)) {
                        const key = Number(strKey);
                        if (currentJob === val) {
                            set((state) => ({ character: { ...state.character, job: [key.toString()] } }));
                            break;
                        }
                    }
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            update_regular_mount: async (regular_mount_checked: number) => {
                set(() => ({ regular_mount_checked }));
                const currentJob = parseInt(get().character.job[0]);
                if (regular_mount_checked === 1) {
                    for (const [strKey, val] of Object.entries(regular_mount_list)) {
                        const key = Number(strKey);
                        if (currentJob === key) {
                            set((state) => ({ character: { ...state.character, job: [val.toString()] } }));
                            break;
                        }
                    }
                }
                else {
                    for (const [strKey, val] of Object.entries(regular_mount_list)) {
                        const key = Number(strKey);
                        if (currentJob === val) {
                            set((state) => ({ character: { ...state.character, job: [key.toString()] } }));
                            break;
                        }
                    }
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },

            reset_character: async () => {
                set(() => ({ character: initialState.character }));
                set(() => ({ headgear_upper: initialState.headgear_upper }));
                set(() => ({ headgear_middle: initialState.headgear_middle }));
                set(() => ({ headgear_lower: initialState.headgear_lower }));
                set(() => ({ garment: initialState.garment }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });

            },
            reset_upper_headgear: async () => {
                const currentUpper = get().headgear_upper;
                if(currentUpper === null) return;

                if(currentUpper.location === 0){ //Upper
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentUpper.location === 3){ //Upper & Middle
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[1] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentUpper.location === 4){ //Upper & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentUpper.location === 6){ //Upper & Middle & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[1] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else {
                    return;
                }
            },
            reset_middle_headgear: async () => {
                const currentMiddle = get().headgear_middle;
                if(currentMiddle === null) return;

                if(currentMiddle.location === 1){ //Middle
                    const newHeadgear = get().character.headgear;
                    newHeadgear[1] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentMiddle.location === 3){ //Upper & Middle
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[1] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentMiddle.location === 5){ //Middle & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[1] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentMiddle.location === 6){ //Upper & Middle & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[1] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else {
                    return;
                }
            },
            reset_lower_headgear: async () => {
                const currentLower = get().headgear_lower;
                if(currentLower === null) return;

                if(currentLower.location === 2){ //Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentLower.location === 4){ //Upper & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentLower.location === 5){ //Middle & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[1] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else if(currentLower.location === 6){ //Upper & Middle & Lower
                    const newHeadgear = get().character.headgear;
                    newHeadgear[0] = 0;
                    newHeadgear[1] = 0;
                    newHeadgear[2] = 0;
                    set((state) => ({ character: { ...state.character, headgear: newHeadgear } }));
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    const currentChar = get().character;
                    const response = await PostRender(currentChar);
                    set({ character_url: response });
                    return;
                }
                else {
                    return;
                }
            },
            reset_garment: async () => {
                set((state) => ({ character: { ...state.character, garment: initialState.character.garment } }));
                set(() => ({ garment: initialState.garment }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
            load_character: async () => {
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
            },
        }),
        {
            name: 'character-storage',
            onRehydrateStorage: () => (state) => {
                if(state){
                    state._hasHydrated = true;
                }
            },
            partialize: (state) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { character_url, ...rest } = state;
                return rest;
            },
        }
    )
);
