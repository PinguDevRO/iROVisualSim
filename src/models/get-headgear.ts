import { GetHeadgearResponse } from "@/services/get-headgear";

export interface HeadgearItemList {
    itemId: number;
    name: string;
};
export interface HeadgearModel {
    accessoryId: number;
    location: number;
    items: HeadgearItemList[];
};

const HeadgearToModel = (data: GetHeadgearResponse[]): HeadgearModel[] => {
    const output: HeadgearModel[] = [];
    for (const val of data) {
        const items: HeadgearItemList[] = [];
        for (const x of val.items){
            items.push({
                itemId: x.item_id,
                name: x.name,
            });
        }

        output.push({
            accessoryId: val.accessory_id,
            location: val.location,
            items: items,
        });
    }

    return output;
};

export default HeadgearToModel;
