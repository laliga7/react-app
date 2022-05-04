import * as api from '../api/login'
export const findUser = async(id)=>{
    try {
        const {data} = await api.findUser(id);
        return data;
    }catch(error){
        console.log(error)
    }
}