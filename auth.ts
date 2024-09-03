import NextAuth, { CredentialsSignin } from 'next-auth'
import { compare } from 'bcryptjs'
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import User from './Models/userModel'
import dbConnect from './lib/dbConnect'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialProvider({
      name: 'credential',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: "password" }
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined
        const password = credentials.password as string | undefined

        if (!email || !password) throw new CredentialsSignin("Please providde both email and password")

        await dbConnect()
        const user = await User.findOne({ email })

        if (!user) throw new CredentialsSignin("Invalid email or password")
        if (!user.password) throw new CredentialsSignin("Invalid email or password")

        const isMatched = compare(password, user.password)
        if (!isMatched) throw new CredentialsSignin("Invalid email or password")
        // if (!user.isVerified) throw new CredentialsSignin("Please verify you email")

        return { name: user.name, email: user.email, id: user._id }
      }
    })
  ],
  pages: {
    signIn: "/login",
  }
})
