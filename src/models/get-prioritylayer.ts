import { GetPriorityLayerResponse } from "@/services/get-prioritylayer";

export interface PriorityLayerItemList {
    accessoryId: number;
    layer: number;
};

export interface PriorityLayerModel {
    upperLayer: number;
    middleLayer: number;
    lowerLayer: number;
    garmentLayer: number;
    itemList: PriorityLayerItemList[];
};

const PriorityLayerToModel = (data: GetPriorityLayerResponse): PriorityLayerModel => {
    const output: PriorityLayerModel = {
        upperLayer: data.upper_layer,
        middleLayer: data.middle_layer,
        lowerLayer: data.lower_layer,
        garmentLayer: data.garment_layer,
        itemList: [],
    };

    for (const val of data.item_list) {
        

        output.itemList.push({
            accessoryId: val.accessory_id,
            layer: val.layer,
        });
    }

    return output;
};

export default PriorityLayerToModel;
