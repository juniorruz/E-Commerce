"use client"

import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().trim().optional(),
})

export const InputSearch = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/search?query=${data.title}`)
    form.reset({ title: "" })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Faça sua busca..."
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"ghost"}
            className="absolute right-4 top-2"
          >
            <Search width={20} height={20} />
          </Button>
        </form>
      </Form>
    </div>
  )
}
