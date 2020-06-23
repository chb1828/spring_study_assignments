import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
    login(username, password) {
        const user = {
            username: username,
            password: password
        };
        return axios
            .post(API_URL+"login", user)
            .then(response => {
                if (response.data) {
                    localStorage.setItem('authenticatedUser',username);
                    localStorage.setItem('token',response.data);
                    alert("성공");
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return localStorage.getItem('authenticatedUser');
    }
}

export default new AuthService();