export const SIGNUP_MUTATION = `
    mutation Signup($signupData: SignupDataDto!){
        signup(signupData:$signupData){
            id
        }
    }
`;
