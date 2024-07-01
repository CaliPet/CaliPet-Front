import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useTranslation } from "react-i18next";
import useAuth from "@/lib/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Sua senha deve ter no mínimo 8 caracteres!",
    }),
    confirmPassword: z.string().min(8, {
      message: "Sua senha deve ter no mínimo 8 caracteres!",
    }),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: "custom",
        message: "As senhas não são iguais",
        path: ["confirmPassword"],
      });
    }
  });

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

type PasswordVisibilityState = {
  login: boolean;
  signup: boolean;
  confirmSignup: boolean;
};

export function Login() {
  const { t } = useTranslation();
  const { toggleAuth, isAuthenticated } = useAuth();

  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityState>({
      login: false,
      signup: false,
      confirmSignup: false,
    });

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = (field: keyof PasswordVisibilityState) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const registerForm = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const loginForm = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleRegisterSubmit(
    values: z.infer<typeof registerUserSchema>
  ) {
    // Salvar o usuário
    const user = {
      nome: values.firstName + " " + values.lastName,
      email: values.email,
      senha: values.password,
    };

    // Aqui manda o usuário para o servidor
    toast.loading('Enviando dados...', {
      id: "loader"
    })

    try {
      const response = await fetch(
        import.meta.env.VITE_API_REGISTER,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        if(response.status == 409) {
          toast.warning('Email já cadastrado!')
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Usuário registrado com sucesso!");
      registerForm.reset();
    } catch (err) {
      console.log(err)
    }

    toast.dismiss('loader')
  }

  async function handleLoginSubmit(values: z.infer<typeof loginUserSchema>) {

    // Salvar o usuário
    const user = {
      email: values.email,
      senha: values.password,
    };

    // Aqui manda o usuário para o servidor
    toast.loading("Buscando dados...", {
      id: 'loader'
    })
    try {
      const response = await fetch(
        import.meta.env.VITE_API_LOGIN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));

      loginForm.reset();
      toast.success("Usuário logado!");

      toggleAuth();

    } catch (err) {
      toast.error("Email ou Senha incorreto!");
    }

    toast.dismiss('loader')
  }

  return (
    <div className="h-screen bg-creme bg-[url('/paw_path.png')] bg-left bg-repeat-x">
      <Tabs
        defaultValue="login"
        className="w-full m-0 sm:w-[400px] p-2 bg-varOrange rounded-sm fixed left-[50%] top-[50%] z-50 max-w-sm translate-x-[-50%] translate-y-[-50%]"
      >
        <TabsList className="w-full bg-transparent">
          <TabsTrigger
            className="text-zinc-100 font-bungee rounded-none rounded-l bg-light-brown-500"
            value="login"
          >
            {t("pages.login.login")}
          </TabsTrigger>
          <TabsTrigger
            className="text-zinc-100 font-bungee rounded-none rounded-r bg-light-brown-500"
            value="create"
          >
            {t("pages.login.signUp")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Form {...loginForm} >
            <form
              onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
              className="space-y-4 px-2"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Senha:
                    </FormLabel>
                    <FormControl className="flex">
                      <div className="relative">
                        <Input
                          placeholder="Digite sua senha..."
                          type={passwordVisibility.signup ? "text" : "password"}
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute top-1 right-2"
                          onClick={() => togglePasswordVisibility("signup")}
                        >
                          {passwordVisibility.signup ? (
                            <Eye size={30} />
                          ) : (
                            <EyeClosed size={30} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isAuthenticated ? (
                <Button
                  disabled
                  className="w-full bg-light-brown-900"
                >
                  Você está logado!
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-light-brown-500 hover:bg-light-brown"
                >
                  {t("pages.login.btnInput")}
                </Button>
              )}
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="create">
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
              className="space-y-4 px-2"
            >
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Nome:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Sobrenome:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Senha:
                    </FormLabel>
                    <FormControl className="flex">
                      <div className="relative">
                        <Input
                          placeholder="Digite sua senha..."
                          type={passwordVisibility.signup ? "text" : "password"}
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute top-1 right-2"
                          onClick={() => togglePasswordVisibility("signup")}
                        >
                          {passwordVisibility.signup ? (
                            <Eye size={30} />
                          ) : (
                            <EyeClosed size={30} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light-brown-900 text-lg font-semibold">
                      Confirmar Senha:
                    </FormLabel>
                    <FormControl className="flex">
                      <div className="relative">
                        <Input
                          placeholder="Confirme sua senha..."
                          type={
                            passwordVisibility.confirmSignup
                              ? "text"
                              : "password"
                          }
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute top-1 right-2"
                          onClick={() =>
                            togglePasswordVisibility("confirmSignup")
                          }
                        >
                          {passwordVisibility.confirmSignup ? (
                            <Eye size={30} />
                          ) : (
                            <EyeClosed size={30} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-light-brown-500 hover:bg-light-brown"
              >
                {t("pages.signUp.btnSignUp")}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  );
}
