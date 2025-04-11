import { loginSchema } from "@/common/config/schemas";
import { useAdminLogin } from "@/common/quries/auth";
import { FormInput } from "@/components/form";
import { rootRoute } from "@/components/layouts";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export function SignInPage() {
  const { mutate } = useAdminLogin();
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: Login) => {
    const { email, password } = values;
    const payload = {
      email,
      password,
    };
    mutate(payload);
  };

  return (
    <Page title="SignIn" className="container h-screen flex items-center">
      <Card className="mx-auto max-w-lg w-full p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Enter your information to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-2">
                <div className="grid gap-2">
                  <FormInput
                    formData={form}
                    name="email"
                    label="Email"
                    required
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <FormInput
                    formData={form}
                    name="password"
                    label="Password"
                    required
                    type="password"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Sign In
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </Page>
  );
}

export const signInRoute = createRoute({
  path: "/sign-in",
  getParentRoute: () => rootRoute,
  component: () => <SignInPage />,
});
