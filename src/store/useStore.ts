import { create } from 'zustand';
import { HeadgearModel } from '@/models/get-headgear';
import { GarmentModel } from '@/models/get-garment';
import { PriorityLayerModel } from '@/models/get-prioritylayer';
import { persist } from 'zustand/middleware';
import { regular_mount_list, cash_mount_list, third_job } from '@/constants/joblist';
import PostRender from '@/services/post-render';

const sanitizeStringOutput = (name: string): string => {
    return name
        .trim()
        .replace(/[/\\?%*:|"<>]/g, '')
        .replace(/\s+/g, '_');
};

const getPriorityLayer = (priorityLayer: PriorityLayerModel | undefined, accessoryId: number): number | null => {
    if (priorityLayer === undefined) return null;

    const idx = priorityLayer.itemList.findIndex((x) => x.accessoryId === accessoryId);
    if (idx >= 0) {
        return priorityLayer.itemList[idx].layer;
    }

    return null;
}

export type Direction = "Left" | "Right";

export type CharacterData = {
    gender: number;
    job: string[];
    head: number;
    headPalette: number;
    headdir: number;
    headgear: number[];
    garment: number;
    bodyPalette: number;
    madogearType: number;
    action: number;
    canvas: string;
    outfit: number;
};

export type Character = {
    exist: boolean;
    name: string | null;
    character_url: string | null;
    character: CharacterData;
    headgear_upper: HeadgearModel | null;
    headgear_middle: HeadgearModel | null;
    headgear_lower: HeadgearModel | null;
    garment: GarmentModel | null;
    cash_mount_checked: number;
    regular_mount_checked: number;
    position: number;
};

export type State = {
    _hasHydrated: boolean;
    _characterModal: boolean;
    _priorityLayer: PriorityLayerModel | undefined;
    characterList: Character[];

    name: string | null;
    character_url: string | null;
    character: CharacterData;
    headgear_upper: HeadgearModel | null;
    headgear_middle: HeadgearModel | null;
    headgear_lower: HeadgearModel | null;
    garment: GarmentModel | null;
    cash_mount_checked: number;
    regular_mount_checked: number;
    position: number;

    update_priority_layer: (_priorityLayer: PriorityLayerModel | undefined) => void;
    update_object_in_array: () => void;
    update_char_name: (position: number, name: string) => void;
    update_char_url: (character_url: string | null) => void;
    update_char_gender: (gender: number) => void;
    update_char_job: (job: string[]) => void;
    update_char_head: (head: number) => void;
    update_char_headPalette: (headPalette: number) => void;
    update_char_headdir: (headdir: Direction) => void;
    update_char_headgear: (headgear: HeadgearModel | null) => void;
    update_char_garment: (garment: GarmentModel | null) => void;
    update_char_bodyPalette: (bodyPalette: number) => void;
    update_char_madogearType: (madogearType: number) => void;
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

    download_character_image: () => void;
    load_file_character: (character: CharacterData, headgear_upper: HeadgearModel | null, headgear_middle: HeadgearModel | null, headgear_lower: HeadgearModel | null, garment: GarmentModel | null, cash_mount_checked: number, regular_mount_checked: number) => void;
    load_character_modal: () => void;
    open_character_modal: () => void;
    close_character_modal: () => void;
    load_character: (position: number) => void;
    create_character: (position: number, name: string) => void;
    delete_character: (pos: number) => void;
};

export const initialCharacter: Character = {
    exist: false,
    name: null,
    character_url: null,
    character: {
        gender: 1,
        job: ["0"],
        head: 1,
        headPalette: 1,
        headdir: 0,
        headgear: [0, 0, 0],
        garment: 0,
        bodyPalette: -1,
        madogearType: 0,
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
    position: 0,
};

export const initialState = {
    _hasHydrated: false,
    _characterModal: false,
    _priorityLayer: undefined,
    characterList: Array.from({ length: 30 }, (_, i) => ({
        ...initialCharacter,
        position: i,
    })),

    name: 'iRO Wiki Guard',
    character_url: null,
    character: {
        gender: 1,
        job: ["0"],
        head: 1,
        headPalette: 1,
        headdir: 0,
        headgear: [0, 0, 0],
        garment: 0,
        bodyPalette: -1,
        madogearType: 0,
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
    position: 0,
};

export const useStore = create<State>()(
    persist(
        (set, get) => ({
            ...initialState,

            update_priority_layer: (_priorityLayer: PriorityLayerModel | undefined) => {
                set({ _priorityLayer });
            },
            update_object_in_array: () => {
                const {
                    characterList,
                    position,
                    name,
                    character_url,
                    character,
                    headgear_lower,
                    headgear_middle,
                    headgear_upper,
                    garment,
                    cash_mount_checked,
                    regular_mount_checked,
                } = get();
                const updated = [...characterList];
                const idx = updated.findIndex((x) => x.position === position);

                if (idx >= 0) {
                    updated[idx] = {
                        exist: true,
                        name: name,
                        character_url: character_url,
                        character: character,
                        headgear_lower: headgear_lower,
                        headgear_middle: headgear_middle,
                        headgear_upper: headgear_upper,
                        garment: garment,
                        cash_mount_checked: cash_mount_checked,
                        regular_mount_checked: regular_mount_checked,
                        position: position,
                    };
                    set({ characterList: updated });
                }
            },
            update_char_name: (position: number, name: string) => {
                const { characterList } = get();
                const updated = [...characterList];
                const idx = updated.findIndex((x) => x.position === position);

                if (idx >= 0) {
                    updated[idx] = {
                        ...updated[idx],
                        name: name,
                    };
                    set({ characterList: updated });
                }
            },
            update_char_url: (character_url: string | null) => {
                set(() => ({ character_url }));
                get().update_object_in_array();
            },
            update_char_gender: async (gender: number) => {
                set((state) => ({ character: { ...state.character, gender } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
            },
            update_char_job: async (job: string[]) => {
                const cash_mount = get().cash_mount_checked;
                const regular_mount = get().regular_mount_checked;
                const newJob = parseInt(job[0]);

                if ([20, 4021, 4069, 4264, 4212, 4305].indexOf(newJob) >= 0) { // Female class only
                    set((state) => ({ character: { ...state.character, gender: 0 } }));
                }

                if ([19, 4020, 4068, 4263, 4211, 4304].indexOf(newJob) >= 0) { // Male class only
                    set((state) => ({ character: { ...state.character, gender: 1 } }));
                }

                if (!third_job.some((x) => x.id === newJob)) {
                    set((state) => ({ character: { ...state.character, outfit: 0 } }));
                }

                if ([4218, 4308].indexOf(newJob) >= 0) { // Checking Doram
                    const head = get().character.head;
                    if (head > 10) {
                        set((state) => ({ character: { ...state.character, head: 1 } }));
                    }
                }

                if ([4087, 4279].indexOf(newJob) === -1) {
                    set((state) => ({ character: { ...state.character, madogearType: 0 } }));
                }

                if (cash_mount === 1) {
                    let found = false;
                    for (const [strKey, val] of Object.entries(cash_mount_list)) {
                        const key = Number(strKey);
                        if (newJob === key) {
                            set((state) => ({ character: { ...state.character, job: [val.toString()] } }));
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        set((state) => ({ character: { ...state.character, job } }));
                        set(() => ({ cash_mount_checked: 0 }));
                    }
                }

                else if (regular_mount === 1) {
                    let found = false;
                    for (const [strKey, val] of Object.entries(regular_mount_list)) {
                        const key = Number(strKey);
                        if (newJob === key) {
                            set((state) => ({ character: { ...state.character, job: [val.toString()] } }));
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
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
                get().update_object_in_array();
            },
            update_char_head: async (head: number) => {
                set((state) => ({ character: { ...state.character, head } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
            },
            update_char_headPalette: async (headPalette: number) => {
                set((state) => ({ character: { ...state.character, headPalette } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
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
                get().update_object_in_array();
            },
            update_char_headgear: async (headgear: HeadgearModel | null) => {
                if (!headgear) return;

                const SLOT_NAMES = ['upper', 'middle', 'lower'] as const;
                const SLOT_BITS = [1, 2, 4];
                const MASK_MAP = [1, 2, 4, 3, 5, 6, 7] as const;

                const DEFAULT_PRIORITY = { middle: 100, upper: 200, lower: 300 } as const;
                const newBits = MASK_MAP[headgear.location];

                const toClear = [false, false, false];
                for (let i = 0; i < 3; i++) {
                    const cur = get()[`headgear_${SLOT_NAMES[i]}`] as HeadgearModel | null;
                    if (!cur) continue;
                    const curBits = MASK_MAP[cur.location];
                    if (curBits !== SLOT_BITS[i] && (curBits & newBits) !== 0) {
                        for (let j = 0; j < 3; j++) {
                            if (curBits & SLOT_BITS[j]) toClear[j] = true;
                        }
                    }
                };

                toClear.forEach((doClean, i) => {
                    if (doClean) {
                        set(() => ({ [`headgear_${SLOT_NAMES[i]}`]: initialState[`headgear_${SLOT_NAMES[i]}`] }));
                    }
                });

                for (let i = 0; i < 3; i++) {
                    if (newBits & SLOT_BITS[i]) {
                        set(() => ({ [`headgear_${SLOT_NAMES[i]}`]: headgear }));
                    }
                };

                type Entry = { id: number, priority: number };
                const entries: Entry[] = SLOT_NAMES.map(slot => {
                    const model = get()[`headgear_${slot}`] as HeadgearModel | null;
                    const id = model?.accessoryId ?? 0;
                    const itemPriority = model !== null ? getPriorityLayer(get()._priorityLayer, model.accessoryId) : null;
                    return { id, priority: itemPriority !== null ? itemPriority : DEFAULT_PRIORITY[slot] };
                });

                entries.sort((a, b) => a.priority - b.priority);
                const headgearPriority = entries.map(e => e.id);

                set(state => ({ character: { ...state.character, headgear: headgearPriority } }));
                const resp = await PostRender(get().character);
                set({ character_url: resp });
                get().update_object_in_array();
            },
            update_char_garment: async (garment: GarmentModel | null) => {
                if (garment === null) return;

                set((state) => ({ character: { ...state.character, garment: garment.garmentId } }));
                set(() => ({ garment }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
            },
            update_char_bodyPalette: async (bodyPalette: number) => {
                const currentBodyPalette = get().character.bodyPalette;
                if(currentBodyPalette === bodyPalette) {
                    set((state) => ({ character: { ...state.character, bodyPalette: -1 } }));
                }

                if(currentBodyPalette !== bodyPalette) {
                    set((state) => ({ character: { ...state.character, bodyPalette } }));
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
            },
            update_char_madogearType: async (madogearType: number) => {
                const madogearJob = [4087, 4279];
                const currentJob = parseInt(get().character.job[0]);
                const isAMadogearJob = madogearJob.findIndex((x) => x === currentJob);

                if(isAMadogearJob >= 0) {
                    set((state) => ({ character: { ...state.character, madogearType } }));
                }

                if(isAMadogearJob === -1) {
                    set((state) => ({ character: { ...state.character, madogearType: 0 } }));
                }

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
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
                get().update_object_in_array();
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
                get().update_object_in_array();
            },
            update_char_outfit: async (outfit: number) => {
                set((state) => ({ character: { ...state.character, outfit } }));
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
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
                get().update_object_in_array();
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
                get().update_object_in_array();
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
                get().update_object_in_array();
            },
            reset_upper_headgear: async () => {
                const SLOT_NAMES = ['upper', 'middle', 'lower'] as const;
                const DEFAULT_PRIORITY = { middle: 100, upper: 200, lower: 300 } as const;
                const currentUpper = get().headgear_upper;
                if (currentUpper === null) return;

                if (currentUpper.location === 0) { //Upper
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                }
                if (currentUpper.location === 3) { //Upper & Middle
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                }
                if (currentUpper.location === 4) { //Upper & Lower
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));
                }
                if (currentUpper.location === 6) { //Upper & Middle & Lower
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));
                }

                type Entry = { id: number, priority: number };
                const entries: Entry[] = SLOT_NAMES.map(slot => {
                    const model = get()[`headgear_${slot}`] as HeadgearModel | null;
                    const id = model?.accessoryId ?? 0;
                    const itemPriority = model !== null ? getPriorityLayer(get()._priorityLayer, model.accessoryId) : null;
                    return { id, priority: itemPriority !== null ? itemPriority : DEFAULT_PRIORITY[slot] };
                });

                entries.sort((a, b) => a.priority - b.priority);
                const headgearPriority = entries.map(e => e.id);

                set(state => ({ character: { ...state.character, headgear: headgearPriority } }));
                
                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
                return;
            },
            reset_middle_headgear: async () => {
                const SLOT_NAMES = ['upper', 'middle', 'lower'] as const;
                const DEFAULT_PRIORITY = { middle: 100, upper: 200, lower: 300 } as const;
                const currentMiddle = get().headgear_middle;
                if (currentMiddle === null) return;

                if (currentMiddle.location === 1) { //Middle
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                }
                if (currentMiddle.location === 3) { //Upper & Middle
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                }
                if (currentMiddle.location === 5) { //Middle & Lower
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));
                }
                if (currentMiddle.location === 6) { //Upper & Middle & Lower
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));

                    
                }

                type Entry = { id: number, priority: number };
                const entries: Entry[] = SLOT_NAMES.map(slot => {
                    const model = get()[`headgear_${slot}`] as HeadgearModel | null;
                    const id = model?.accessoryId ?? 0;
                    const itemPriority = model !== null ? getPriorityLayer(get()._priorityLayer, model.accessoryId) : null;
                    return { id, priority: itemPriority !== null ? itemPriority : DEFAULT_PRIORITY[slot] };
                });

                entries.sort((a, b) => a.priority - b.priority);
                const headgearPriority = entries.map(e => e.id);

                set(state => ({ character: { ...state.character, headgear: headgearPriority } }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
                return;
            },
            reset_lower_headgear: async () => {
                const SLOT_NAMES = ['upper', 'middle', 'lower'] as const;
                const DEFAULT_PRIORITY = { middle: 100, upper: 200, lower: 300 } as const;
                const currentLower = get().headgear_lower;
                if (currentLower === null) return;

                if (currentLower.location === 2) { //Lower
                    set(() => ({ headgear_lower: initialState.headgear_lower }));
                }
                if (currentLower.location === 4) { //Upper & Lower
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));
                }
                if (currentLower.location === 5) { //Middle & Lower
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));
                }
                if (currentLower.location === 6) { //Upper & Middle & Lower
                    set(() => ({ headgear_upper: initialState.headgear_upper }));
                    set(() => ({ headgear_middle: initialState.headgear_middle }));
                    set(() => ({ headgear_lower: initialState.headgear_lower }));                    
                }

                type Entry = { id: number, priority: number };
                const entries: Entry[] = SLOT_NAMES.map(slot => {
                    const model = get()[`headgear_${slot}`] as HeadgearModel | null;
                    const id = model?.accessoryId ?? 0;
                    const itemPriority = model !== null ? getPriorityLayer(get()._priorityLayer, model.accessoryId) : null;
                    return { id, priority: itemPriority !== null ? itemPriority : DEFAULT_PRIORITY[slot] };
                });

                entries.sort((a, b) => a.priority - b.priority);
                const headgearPriority = entries.map(e => e.id);

                set(state => ({ character: { ...state.character, headgear: headgearPriority } }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
                return;
            },
            reset_garment: async () => {
                set((state) => ({ character: { ...state.character, garment: initialState.character.garment } }));
                set(() => ({ garment: initialState.garment }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });
                get().update_object_in_array();
            },
            load_character_modal: async () => {
                const { characterList } = get();
                const updated = [...characterList];
                for (const [index, char] of updated.entries()) {
                    if (char.exist) {
                        const response = await PostRender(char.character);
                        updated[index].character_url = response;
                    }
                }
                set({ characterList: updated });
            },
            download_character_image: () => {
                const character_url = get().character_url;
                const name = get().name;
                if (character_url !== null && name !== null) {
                    const filename = sanitizeStringOutput(name);
                    const a = document.createElement('a');
                    a.href = character_url;
                    a.download = `${filename}.png`;
                    document.body.appendChild(a);
                    a.click();

                    document.body.removeChild(a);
                }
            },
            load_file_character: async (character: CharacterData, headgear_upper: HeadgearModel | null, headgear_middle: HeadgearModel | null, headgear_lower: HeadgearModel | null, garment: GarmentModel | null, cash_mount_checked: number, regular_mount_checked: number) => {
                set((state) => ({
                    ...state,
                    character: character,
                    headgear_upper: headgear_upper,
                    headgear_middle: headgear_middle,
                    headgear_lower: headgear_lower,
                    garment: garment,
                    cash_mount_checked: cash_mount_checked,
                    regular_mount_checked: regular_mount_checked,
                }));

                const currentChar = get().character;
                const response = await PostRender(currentChar);
                set({ character_url: response });

                const { characterList } = get();
                const updated = [...characterList];
                const idx = characterList.findIndex((x) => x.position === 0);
                updated[idx].character_url = response;
                set({ characterList: updated });
            },
            open_character_modal: () => {
                set({ _characterModal: true });
            },
            close_character_modal: () => {
                set({ _characterModal: false });
            },
            load_character: (position: number) => {
                const { characterList } = get();
                const idx = characterList.findIndex((x) => x.position === position);

                if (idx >= 0) {
                    set((state) => ({
                        ...state,
                        name: characterList[idx].name,
                        character_url: characterList[idx].character_url,
                        character: characterList[idx].character,
                        headgear_lower: characterList[idx].headgear_lower,
                        headgear_middle: characterList[idx].headgear_middle,
                        headgear_upper: characterList[idx].headgear_upper,
                        garment: characterList[idx].garment,
                        cash_mount_checked: characterList[idx].cash_mount_checked,
                        regular_mount_checked: characterList[idx].regular_mount_checked,
                        position: characterList[idx].position,
                    }));
                }
            },
            create_character: async (position: number, name: string) => {
                const { characterList } = get();
                const updated = [...characterList];
                const idx = updated.findIndex((x) => x.position === position);

                if (idx >= 0) {
                    const response = await PostRender(updated[idx].character);
                    updated[idx] = {
                        ...updated[idx],
                        character_url: response,
                        name: name,
                        exist: true,
                    };
                    set({ characterList: updated });
                }
            },
            delete_character: (pos: number) => {
                const { characterList, position } = get();
                const updated = [...characterList];
                const idx = updated.findIndex((x) => x.position === pos);

                if (idx >= 0) {
                    updated[idx] = {
                        ...initialCharacter,
                        position: pos,
                    };
                    set({ characterList: updated });

                    if (pos === position) {
                        const idx2 = updated.findIndex((x) => x.exist);
                        if (idx2 >= 0) {
                            get().load_character(updated[idx2].position);
                        }
                        else {
                            get().create_character(0, 'iRO Wiki Guard');
                        }
                    }
                }
            },
        }),
        {
            name: 'character-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
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
