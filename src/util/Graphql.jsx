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
            content
            image
            user{
                id
                name
                profilePhoto
            }             
        }
    }
`;

export const GET_BLOG_BY_ID = `
    query GetBlogsById($blogId:Int!){
        getBlogById(blogId:$blogId){
            title
            subTitle
            category
            content
            image
            createdAt
            user{
                id
                name
            }
        }
    }
`;

export const CREATE_BLOG_MUTATION = `
    mutation CreateBlog($blogData:BlogDataDto!){
        createBlog(blogData:$blogData){
            id
        }
    }
`;

export const FORGOT_PASSWORD_MUTATION = `
    mutation ForgotPassword($userMail:String!){
        forgotPassword(userMail:$userMail){
            message
        }
    }
`;

export const RESET_PASSWORD_MUTATION = `
    mutation ResetPassword($resetPasswordData:ResetPasswordDto!){
        resetPassword(resetPasswordData:$resetPasswordData){
            message
        }
    }
`;

export const GET_USER = `
    query{
        getUser {
            id
            name
            profilePhoto
            email                 
        }
    }
`;

export const EDIT_BLOG_MUTATION = `
    mutation EditBlog($blogId:Int!,$editBlogData:EditBlogDataDto!){
        editBlog(blogId:$blogId,editBlogData:$editBlogData){
            id
        }
    }
`;

export const DELETE_BLOG_MUTATION = `
    mutation DeleteBlog($blogId:Int!){
        deleteBlog(blogId:$blogId){
            message
        }
    }
`;
