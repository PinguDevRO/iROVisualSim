import { GetGarmentResponse } from "@/services/get-garment";

export interface GarmentItemList {
    itemId: number;
    name: string;
}
export interface GarmentModel {
    garmentId: number;
    items: GarmentItemList[];
};

const GarmentToModel = (data: GetGarmentResponse[]): GarmentModel[] => {
    const output: GarmentModel[] = [];
    for (const val of data) {
        const items: GarmentItemList[] = [];
        for (const x of val.items) {
            items.push({
                itemId: x.item_id,
                name: x.name,
            });
        }

        output.push({
            garmentId: val.garment_id,
            items: items,
        });
    }

    return output;
};

export default GarmentToModel;
