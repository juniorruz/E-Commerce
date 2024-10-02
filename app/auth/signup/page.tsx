"use client"

import { Button } from "@/app/_components/ui/button"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { postNewUser } from "@/services/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
    console.log(response.data)
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-[460px] w-[380px] sm:h-[500px] sm:w-[500px]">
        <CardHeader className="items-center justify-center">
          <CardContent>
            <h1 className="text-3xl font-bold">Cadastrar</h1>
          </CardContent>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid w-full items-center p-3">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Email" />
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
                        <FormLabel>Senha</FormLabel>
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
                <div className="pt-4">
                  <Button type="submit">Criar conta</Button>
                </div>
              </form>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUpPage
