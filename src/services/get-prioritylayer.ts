import { AxiosGet, AxiosResponse } from "./utils";

export interface GetPriorityLayerItemList {
    accessory_id: number;
    layer: number;
};

export interface GetPriorityLayerResponse {
    upper_layer: number;
    middle_layer: number;
    lower_layer: number;
    garment_layer: number;
    item_list: GetPriorityLayerItemList[];
};

const GetPriorityLayer = async (): Promise<GetPriorityLayerResponse |  null> => {
    const url = process.env.NEXT_PUBLIC_IROWIKI_PRIORITYLAYER_METADATA_URL ? process.env.NEXT_PUBLIC_IROWIKI_PRIORITYLAYER_METADATA_URL : "";
    const response: AxiosResponse<GetPriorityLayerResponse | null> = await AxiosGet(`${url}?cache_bust=${Date.now()}`);
    if(response.status === 200){
        return response.data;
    }
    return null;
};

export default GetPriorityLayer;
