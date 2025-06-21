"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { FaSpinner } from "react-icons/fa"
import { AiOutlineSend } from "react-icons/ai"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { saveGuestbookEntry } from "@/app/actions"
import React, { useEffect } from "react"

const guestBookSchema = z.object({
  entry: z.string().min(1, { message: "Message must be atleast 1 character." }),
})

type Input = z.infer<typeof guestBookSchema>

export default function FormEntry() {
  const form = useForm<Input>({
    resolver: zodResolver(guestBookSchema),
    defaultValues: {
      entry: "",
    },
  })

  const { reset, formState } = form
  const { isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [reset, isSubmitSuccessful])

  async function handleOnSubmit(values: Input) {
    const response = await saveGuestbookEntry(values.entry)

    if (!response.ok)
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })

    return toast({
      title: response.data,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="relative max-w-sm space-y-8"
      >
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your message ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="absolute right-0 top-[-31px] h-[34px]"
          type="submit"
          variant="ghost"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin " />
          ) : (
            <AiOutlineSend />
          )}
        </Button>
      </form>
    </Form>
  )
}
