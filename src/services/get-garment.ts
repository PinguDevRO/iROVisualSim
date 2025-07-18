import { AxiosGet, AxiosResponse } from "./utils";

export interface GetGarmentResponse {
    item_id: number;
    garment_id: number;
    name: string;
}

const GetGarments = async (): Promise<GetGarmentResponse[] |  null> => {
    const url = process.env.NEXT_PUBLIC_IROWIKI_GARMENT_METADATA_URL ? process.env.NEXT_PUBLIC_IROWIKI_GARMENT_METADATA_URL : "";
    const response: AxiosResponse<GetGarmentResponse[] | null> = await AxiosGet(url);
    if(response.status === 200){
        return response.data;
    }
    return null;
};

export default GetGarments;
