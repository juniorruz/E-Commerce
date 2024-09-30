"use client"

import { Button } from "@/app/_components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import * as yup from "yup"
import { Loader2, LogIn } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from "next-auth/react"
import { IoChevronBack } from "react-icons/io5"

const formSchema = yup.object({
  email: yup
    .string()
    .email("Insira um email válido")
    .required("Email obrigatório"),
  password: yup.string().required("Senha obrigatória"),
})

const LoginPage = () => {
  const [signInCredentialsError, setSignInCredentialsError] =
    useState<boolean>(false)
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false)

  const form = useForm({ resolver: yupResolver(formSchema) })

  const onSubmit = async (data: yup.Asserts<typeof formSchema>) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setSignInCredentialsError(!!result?.error)
      setIsSignInLoading(true)
    }
  }

  return (
    <>
      <header className="flex items-center justify-between p-4 pt-[2px] sm:pt-5 xl:px-48">
        <div className="flex items-center">
          <button>
            <Link className="flex" href="/">
              <IoChevronBack className="md:text-xl" />
              <span className="text-xs">Voltar</span>
            </Link>
          </button>
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-sm uppercase sm:text-2xl">Login/Cadastro</h1>
        </div>

        <div className="text-right">
          <h3 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
            Neon Tech
          </h3>
        </div>
      </header>

      <div className="flex h-full flex-col items-center px-4 pt-10 xl:px-72">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-8 sm:flex-row">
          <div className="flex w-full flex-col md:w-1/2">
            <div className="text-center">Possui conta? Faça seu login</div>
            <div className="mt-4 h-auto w-full">
              <Form {...form}>
                <div className="mt-10 flex flex-col gap-4">
                  {signInCredentialsError && (
                    <span className="text-red-500">
                      Email ou senha inválidos
                    </span>
                  )}
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="Email"
                                className="w-full"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4 flex flex-col space-y-1.5">
                      <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="Senha"
                                className="w-full"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        className="h-12 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 uppercase hover:opacity-90"
                        type="submit"
                      >
                        {isSignInLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <LogIn className="mr-2 h-5 w-5" />
                        )}
                        Acessar conta
                      </Button>
                    </div>
                  </form>
                </div>
              </Form>
            </div>
          </div>

          <div className="flex h-full w-full flex-col items-center justify-center md:w-1/2">
            <div className="h-full text-center">
              <h1>Não possui conta?</h1>
              <p className="mt-4 text-sm">Crie uma conta gratuita.</p>
            </div>
            <div className="flex w-full pt-3">
              <Button
                asChild
                className="mb-[120px] flex h-12 w-full border-solid bg-green-700 uppercase hover:border-green-700 hover:bg-green-800"
              >
                <Link href="/auth/signup">Criar conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
