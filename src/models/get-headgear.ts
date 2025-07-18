import { GetHeadgearResponse } from "@/services/get-headgear";

export interface HeadgearModel {
    itemId: number;
    accessoryId: number;
    name: string;
    location: number;
};

const HeadgearToModel = (data: GetHeadgearResponse[]): HeadgearModel[] => {
    const output: HeadgearModel[] = [];
    for (const val of data) {
        output.push({
            itemId: val.item_id,
            accessoryId: val.accessory_id,
            name: val.name,
            location: val.location,
        })
    }

    return output;
};

export default HeadgearToModel;
