import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig"

// Extend NextAuth types to include 'id' on session.user and token
import NextAuthTypes from "next-auth"
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    name?: string | null
    email?: string | null
    picture?: string | null
  }
}

const client = new MongoClient(process.env.MONGO_URI!)
const clientPromise = client.connect()

const handler = NextAuth({
  providers: [

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connect()
          const user = await User.findOne({ email: credentials.email })
          
          if (!user) {
            return null
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,           
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],

  session: {
    strategy: "jwt" 
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    async session({ session, token }) {
      // Fix: Add null check for session.user
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          await connect()
          
          const existingUser = await User.findOne({ email: user.email })
          
          if (existingUser) {
            // User exists - update with OAuth provider info if needed
            if (!existingUser.provider || existingUser.provider === 'credentials') {
              await User.findByIdAndUpdate(existingUser._id, {
                $addToSet: { 
                  providers: {
                    name: account.provider,
                    id: account.providerAccountId
                  }
                }
              })
            }
            return true
          } else {
            // Create new user
            await User.create({
              username: user.name || user.email?.split('@')[0],
              email: user.email,
              provider: account.provider,
              providerId: account.providerAccountId,
              providers: [{
                name: account.provider,
                id: account.providerAccountId
              }]
            })
            return true
          }
        } catch (error) {
          console.error("Sign in error:", error)
          return false
        }
      }
      return true
    }
  },

  
  pages: {
    signIn: '/login',
  },

  
  events: {
    async linkAccount({ user, account }) {
      console.log("Account linked:", { user: user.email, provider: account.provider })
    }
  },

  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }