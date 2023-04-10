import axios from "axios";
import {ROOT_URL} from "../utils/constant";

export async function loader({params}) {
    const url = `${ROOT_URL}/member/show/${params.stadiumId}`;
    let members;
    const {stadiumId} = params;

    await axios.get(url).then(response => {
        members = response.data.members
    })
    return {members,stadiumId};
}