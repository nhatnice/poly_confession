import Axios from '../Axios';

class Users {
    static async authGoogle(token) {
        return Axios.post(`/client_users/auth/google`, {
            token
        });
    }
}

export default Users;