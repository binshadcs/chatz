import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH = {
    providers: [
      CredentialsProvider({
          name: 'Email',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {
              
              return {
                  id: "user1",
                  name : "Binshad K",
                  email : "binshadcs@gmail.com"
              };
          },
        })
    ],
    callbacks:{
      jwt : ({token, user}) => {
        token.userId = token.sub
        return token
      }
    },
    pages : {
        signIn : "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
  }