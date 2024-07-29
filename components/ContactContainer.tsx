import { Button, Input, Snippet, Textarea } from "@nextui-org/react"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { sendContactForm } from "./lib/sendContactFormApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const ContactContainer = () => {
  const [name, setName] = useState(String)
  const [email, setEmail] = useState(String)
  const [message, setMessage] = useState(String)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMessageValid, setIsMessageValid] = useState(true)

  const handleValidate = useCallback(
    (name: string, email: string, message: string) => {
      if (name === "" || email === "" || message === "" || error === true) {
        setIsMessageValid(false)
      } else {
        setIsMessageValid(true)
      }
    },
    [error]
  )

  useEffect(() => {
    handleValidate(name, email, message)
  }, [name, email, message, handleValidate])

  const isValidEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setEmail(value)
    if (value !== "") {
      if (!isValidEmail(value)) {
        setError(true)
      } else {
        setError(false)
      }
    }
  }
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setName(value)
  }
  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setMessage(value)
  }
  const onSubmit = async () => {
    if (isMessageValid) setIsLoading(true)
    let mailData = { name, email, message }

    try {
      await sendContactForm(mailData)
      toast.success("Message has been sent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <div
      className="mt-20 flex w-full max-w-4xl flex-col rounded-xl
     rounded-b-none border-b-0 border-foreground bg-gradient-to-b from-gradient p-4"
    >
      <div className="mx-auto mb-6 py-2 text-3xl font-bold">Contact me</div>

      <ToastContainer
        className={"mt-12"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="grid w-full grid-cols-1 place-items-center gap-8 lg:grid-cols-2 lg:place-items-start">
        <div className="flex  flex-col items-center lg:items-start">
          <div className="  flex place-items-end text-xl">
            <Snippet className="h-14" symbol={""}>
              andrzejsuchecki.wfb@gmail.com
            </Snippet>
          </div>
        </div>
        <div className="flex w-full max-w-xl flex-col place-items-end  gap-4  ">
          <Input
            type="name"
            label="Name"
            onChange={handleChangeName}
            placeholder="Enter your name"
          />
          <Input
            type="email"
            label="Email"
            isInvalid={error}
            color={error ? "danger" : "default"}
            errorMessage={error ? "Please enter a valid email" : ""}
            onChange={handleChangeEmail}
            placeholder="Enter your email"
          />
          <Textarea
            label="Message"
            placeholder="Enter your message"
            className=""
            onChange={handleChangeMessage}
          />
          <Button
            isDisabled={!isMessageValid}
            onClick={onSubmit}
            isLoading={isLoading}
            variant="solid"
            size="lg"
            color="primary"
            className="  w-48 px-5 leading-3 text-white"
          >
            {isLoading ? null : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContactContainer
