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
import User from '@/Models/userModel'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import dbConnect from '@/lib/dbConnect'

const SignUppage = () => {

  const handleSubmit = async (data: FormData) => {
    'use server'
    const name = data.get('name') as string | undefined
    const email = data.get('email') as string | undefined
    const password = data.get('password') as string | undefined

    if (!email || !password || !name) throw new Error("Please provide all fields")

    await dbConnect()
    const user = await User.findOne({ email })

    if (user) throw new Error("User already exits")

    const hashedPassword = await hash(password, 10)
    User.create({
      name,
      email,
      password: hashedPassword
    })

    redirect("/login")
  }

  return (
    <div className='flex  min-h-screen justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={handleSubmit}
            className='flex flex-col gap-4'
          >
            <Input type="text" placeholder='Name' name='name' />
            <Input type="email" placeholder='Email' name='email' />
            <Input type='password' placeholder='Password' name='password' />
            <Button type='submit'>
              Sign Up
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
          <p className="text-sm text-gray-600">Already have an account?
            {" "}
            <Link href={"/signup"} className='underline'>
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUppage
