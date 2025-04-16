'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export type LoginState = {
  success: null | boolean;
  message?: string;
}

export async function login(previousState: LoginState, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/app/groups`
    }
  })

  if (error) {
    return {
      success: false,
      message: error.message
    }
  }
  
  return {
    success: true,
    message: "Email enviado!"
  }
}