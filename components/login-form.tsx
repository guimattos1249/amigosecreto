"use client"

import { useActionState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { login, LoginState } from "@/app/(auth)/login/actions"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Loader, MessageCircle } from "lucide-react"

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {
      success: null,
      message: ""
    }
  );

  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription className="break-words whitespace-normal">
          Digite seu email para receber seu link de login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="maria@gmail.com" required />
            </div>

            {state.success === true && (
              <Alert className="text-muted-foreground">
                <MessageCircle className="h-4 w-4 !text-green-600" />
                <AlertTitle className="text-gray-50">
                  Email enviado!
                </AlertTitle>
                <AlertDescription>
                  Confira seu inbox para acessar o link de login.
                </AlertDescription>
              </Alert>
            )}

            {state.success === false && (
              <Alert className="text-muted-foreground">
                <MessageCircle className="h-4 w-4 !text-red-600" />
                <AlertTitle className="text-gray-50">
                  Erro!
                </AlertTitle>
                <AlertDescription>
                  Ocorreu um erro ao enviar o link de login. Entre em contato com o suporte!
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              {pending && <Loader className="animate-spin" />}
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}