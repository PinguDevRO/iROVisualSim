import { GetGarmentResponse } from "@/services/get-garment";

export interface GarmentModel {
    itemId: number;
    garmentId: number;
    name: string;
};

const GarmentToModel = (data: GetGarmentResponse[]): GarmentModel[] => {
    const output: GarmentModel[] = [];
    for (const val of data) {
        output.push({
            itemId: val.item_id,
            garmentId: val.garment_id,
            name: val.name,
        })
    }

    return output;
};

export default GarmentToModel;
