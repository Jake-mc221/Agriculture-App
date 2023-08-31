import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import Link from "next/link";

export default function Login() {
  return (
    <PageContainer>
      <div className="flex-1 flex w-full flex-col-reverse gap-5 items-center bg-white">
        <div className="w-full flex flex-col gap-10">
          <h1>Welcome Back</h1>
          <form className="flex-grow w-full flex flex-col gap-5">
            <label className="flex flex-col">
              <h3>Email Address</h3>
              <input
                type="text"
                placeholder="email@example.com"
                className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
              />
            </label>
            <label className="flex flex-col">
              <h3>Password</h3>
              <input
                type="text"
                placeholder="enter password"
                className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
              />
            </label>
            <div className="pt-10 flex flex-col gap-5">
              <Button type="submit">Login</Button>
              <Button intent="secondary" component={Link} href="/">
                Forgot your password?
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
