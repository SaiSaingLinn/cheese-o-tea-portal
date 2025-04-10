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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRoute, useNavigate } from "@tanstack/react-router";

export function SignInPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate({
      to: "/",
    });
  };

  return (
    <Page title="SignIn" className="container h-screen flex items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>
            Enter your information to create sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
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
          </div>
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
