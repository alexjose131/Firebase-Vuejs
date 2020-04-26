import { API_URL } from "./config";

export default {
    createUser(user: any){
        return API_URL.post('/users/create', user)
    }
};
  