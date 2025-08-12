import { AxiosGet, AxiosResponse } from "./utils";

export interface GetGarmentItemList {
    item_id: number;
    name: string;
}
export interface GetGarmentResponse {
    garment_id: number;
    items: GetGarmentItemList[];
}

const GetGarments = async (): Promise<GetGarmentResponse[] |  null> => {
    const url = process.env.NEXT_PUBLIC_IROWIKI_GARMENT_METADATA_URL ? process.env.NEXT_PUBLIC_IROWIKI_GARMENT_METADATA_URL : "";
    const response: AxiosResponse<GetGarmentResponse[] | null> = await AxiosGet(`${url}?cache_bust=${Date.now()}`);
    if(response.status === 200){
        return response.data;
    }
    return null;
};

export default GetGarments;
