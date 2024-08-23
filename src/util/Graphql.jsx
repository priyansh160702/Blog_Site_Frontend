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

export const GET_BLOGS = `
    query{
        getBlogs {
            id
            title
            subTitle
            category
            image
            user{
                name
            }             
        }
    }
`;
