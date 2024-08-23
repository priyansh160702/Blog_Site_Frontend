export const SIGNUP_MUTATION = `
    mutation Signup($signupData: SignupDataDto!){
        signup(signupData:$signupData){
            id
        }
    }
`;

export const LOGIN_MUTATION = `
    mutation Login($loginData: LoginDataDto!){
        login(loginData:$loginData) {
            token
        }
    }
`;
