import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CredentialsSignin } from 'next-auth'
import { signIn } from 'next-auth/react'

const LogInPage = () => {
  const loginHandler = async (data: FormData) => {
    'use server'
    const email = data.get('email') as string | undefined
    const password = data.get('password') as string | undefined

    if (!email || !password) throw new Error("Please provide all fields")
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/"
      })
    } catch (e) {
      const err = e as CredentialsSignin
      return err.message;
    }

  }
  return (
    <div className='flex  min-h-screen justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Login to  your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginHandler} className='flex flex-col gap-4'>
            <Input type="email" placeholder='Email' name='email' />
            <Input type='password' placeholder='Password' name='password' />
            <Button type='submit'>
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
          <span className='w-full text-center'>or</span>
          <form action="" className='w-full'>
            <Button type='submit' variant={"outline"} className='w-full'>
              Login with Google
            </Button>
          </form>
          <p className="text-sm text-gray-600">Don't have an account?
            {" "}
            <Link href={"/signup"} className='underline'>
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LogInPage
