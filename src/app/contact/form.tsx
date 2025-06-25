"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/text-area"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { siteConfig } from "@/config/site"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { sendEmail } from "../actions"

export const contactSchema = z.object({
  messageBy: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters." }),
  emailAddress: z
    .string()
    .email({ message: "Email must be a valid email address." }),
  message: z
    .string()
    .min(30, { message: "Message must be atleast 20 characters." }),
})

type ContactForm = z.infer<typeof contactSchema>

const ContactForm = () => {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      messageBy: "",
      emailAddress: "",
      message: "",
    },
  })
  const { reset, formState, setFocus } = form
  const { isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    setFocus("messageBy")
  }, [setFocus])

  async function handleOnSubmit(data: ContactForm) {
    const { emailAddress, message, messageBy } = data

    const response = await sendEmail({
      emailAddress,
      body: message,
      messageBy,
      action: "contact",
    })

    if (!response.ok) return toast({ title: response.data })

    return toast({
      title: response.data,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="messageBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder={siteConfig.username} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder={`${siteConfig.username}@example.com`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Send
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
