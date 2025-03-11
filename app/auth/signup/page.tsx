"use client"

import { Button } from "@/app/_components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { postNewUser } from "@/services/api"

import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoChevronBack } from "react-icons/io5"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  name: z.string({
    message: "Nome é obrigatório",
  }),
  password: z.string().min(8, {
    message: "Senha deve ter no mínimo 8 caracteres",
  }),
})

const SignUpPage = () => {
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await postNewUser(data)
    if (!response.success) {
      setError(
        response.message ||
          "Usuário já cadastrado. Tente novamente com outro email.",
      )
    } else {
      router.push("/auth/login")
    }
  }
  return (
    <>
      <header className="flex items-center justify-between p-4 pt-[2px] sm:pt-5 xl:px-48">
        <div className="flex items-center">
          <button>
            <Link className="flex" href="/auth/login">
              <IoChevronBack className="md:text-xl" />
              <span className="text-xs">Voltar</span>
            </Link>
          </button>
        </div>

        <div className="flex-1 text-center">
          <h1 className="pl-10 text-sm uppercase sm:text-2xl">Cadastro</h1>
        </div>

        <div className="text-right">
          <h3 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
            Neon Tech
          </h3>
        </div>
      </header>
      <div className="flex h-full flex-col items-center justify-center">
        <div>
          <h1 className="uppercase">Faça seu cadastro</h1>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        <div className="w-full sm:h-[500px] sm:w-[500px]">
          <div>
            <Form {...form}>
              <div className="grid w-full items-center p-3">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="name" placeholder="nome" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4 flex flex-col space-y-1.5">
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
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="pt-2">
                    <Button
                      className="h-12 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 uppercase hover:opacity-90"
                      type="submit"
                    >
                      Cadastrar
                    </Button>
                  </div>
                </form>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
