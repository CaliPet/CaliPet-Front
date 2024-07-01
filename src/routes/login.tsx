import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, useState } from "react";
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

export function Login() {
  const { t } = useTranslation();
  const [showPassLogin, setShowPassLogin] = useState(false);

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

  //Gera um numero aleatorio
  function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  async function handleRegisterSubmit(
    values: z.infer<typeof registerUserSchema>
  ) {
    console.log(values);

    // Salvar o usuário
    const user = {
      idUsuario: getRandomInt(1000, 99999999),
      nome: values.firstName + " " + values.lastName,
      email: values.email,
      senha: values.password,
    };

    console.log(JSON.stringify(user));

    // Aqui manda o usuário para o servidor
    try {
      const response = await fetch(
        "https://calipet-1-0.onrender.com/usuario/adicionar",
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
      console.log(response);
      console.log(json);
    } catch (err) {
      console.log(err);
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("Usuário registrado com sucesso");
    toast.success("Usuário registrado com sucesso");
  }

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataLogin((prevFormDataLogin) => ({
      ...prevFormDataLogin,
      [name]: value,
    }));
  };

  const { toggleAuth, isAuthenticated } = useAuth();

  function handleSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Verificar se o usuário existe no Local Storage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (
      storedUser.email === formDataLogin.email &&
      storedUser.password === formDataLogin.password
    ) {
      console.log("Usuário logado com sucesso");
      toast.success("Usuário logado com sucesso");
      toggleAuth();
    } else {
      console.log("Email ou senha incorretos");
      toast.error("Email ou senha incorretos");
    }
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
          <form
            className="flex flex-col gap-5 p-2"
            onSubmit={handleSubmitLogin}
          >
            <Input
              onChange={handleChangeLogin}
              id="email"
              name="email"
              type="email"
              placeholder={t("pages.login.input1")}
              className="w-full ring-1 focus-visible:ring-1 focus-visible:ring-offset-0"
              required
            />

            <label htmlFor="password" className="flex relative">
              <Input
                onChange={handleChangeLogin}
                id="password"
                name="password"
                type={showPassLogin ? "text" : "password"}
                placeholder={t("pages.login.input2")}
                className="w-full ring-1 focus-visible:ring-1 focus-visible:ring-offset-0"
                required
              />
              <div
                className="absolute right-2 top-1 z-10"
                onClick={() => setShowPassLogin(!showPassLogin)}
              >
                {showPassLogin ? <Eye size={28} /> : <EyeClosed size={28} />}
              </div>
            </label>

            <Dialog>
              <DialogTrigger className="flex text-zinc-100 font-semibold underline pointer hover:text-zinc-200 justify-center">
                {t("pages.forgotPassword.title")}
              </DialogTrigger>
              <DialogContent className="flex bg-varOrange border-transparent max-w-sm">
                <DialogHeader>
                  <DialogTitle className="font-bungee text-center text-2xl text-zinc-100">
                    {t("pages.forgotPassword.title")}
                  </DialogTitle>
                  <DialogDescription className="text-md text-zinc-100 flex flex-col gap-3">
                    {t("pages.forgotPassword.text")}
                    <Input
                      id="email-forgotpass"
                      name="email-forgotpass"
                      type="email"
                      placeholder={t("pages.forgotPassword.input")}
                      className="w-full text-black ring-1 focus-visible:ring-1 focus-visible:ring-offset-0"
                      required
                    />
                    <Button className="w-full bg-light-brown-500 hover:bg-light-brown">
                      {t("pages.forgotPassword.btnInput")}
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {isAuthenticated ? (
              <Button
                type="button"
                className="w-full bg-light-brown-900 hover:bg-light-brown-900"
              >
                Você já está logado!
              </Button>
            ) : (
              <Button className="w-full bg-light-brown-500 hover:bg-light-brown">
                {t("pages.login.btnInput")}
              </Button>
            )}
          </form>
        </TabsContent>

        <TabsContent value="create">
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
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
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Sobrenome" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
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
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirmar Senha"
                        type="password"
                        {...field}
                      />
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
