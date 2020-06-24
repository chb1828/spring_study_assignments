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

    register(username, password,age,description) {
        const user = {
            username: username,
            password: password,
            age: age,
            description: description
        };
        return axios.post(API_URL + "signUp",user)
            .then(response => {
                if(response.data) {
                    alert("성공");
                }
            });
    }

    getCurrentUser() {
        return localStorage.getItem('authenticatedUser');
    }
}

export default new AuthService();