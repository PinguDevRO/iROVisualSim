import { AxiosImage } from "./utils";
import { Character } from "@/store/useStore";


const PostRender = async (body: Character): Promise<string |  null> => {
    const url = process.env.NEXT_PUBLIC_ZRENDERER_BACKEND_URL ? process.env.NEXT_PUBLIC_ZRENDERER_BACKEND_URL : "";
    const response = await AxiosImage(url, {
        ...body
    });

    if(response !== null){
        return response;
    }
    return null;
};

export default PostRender;
