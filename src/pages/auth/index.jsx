import Button from "@/components/Button/Button";
import InputPassword from "@/components/InputPassword/InputPassword";
import InputText from "@/components/InputText/InputText";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const Auth = () => {
  return (
    <section className="flex h-screen">
      <div className="w-[40vw] bg-primary hidden lg:flex justify-center items-center">
        <div className="px-4">
          <Image
            width={400}
            height={400}
            alt="banner login"
            className="w-auto h-auto"
            priority
            src="/images/banner-login.svg"
          />
          <div className="text-center text-primary-content mt-5 flex flex-col gap-2">
            <h1 className="text-primary-content font-bold text-2xl">
              UMKM E-Niaga
            </h1>
            <p>Platform E-niaga tempat Anda dapat membangun mata pencaharian</p>
            <p className="text-xl font-medium text-yellow-200">
              Sukses Online, Ebisnis Global
            </p>
          </div>
        </div>
      </div>
      <div className="grow justify-center flex">
        <div className="mt-[20rem] w-9/12 md:w-8/12 lg:w-1/2 flex flex-col gap-3">
          <div className="flex justify-center">
            <img
              alt="logo"
              className="w-40 h-auto"
              src="/images/logo-color.svg"
            />
          </div>
          <form>
            <h1 className="text-2xl font-medium mb-5 text-center mt-3">
              Login
            </h1>
            <div className="flex flex-col gap-3">
              <InputText size="large" placeholder="Email" />
              <InputPassword size="large" placeholder="Password" />
              <Button
                onClick={(e) => {
                  toast.success("Test");
                }}
                type="submit"
                className="bg-primary hover:bg-primary-focus text-primary-content w-20"
              >
                Log In
              </Button>
              <p className="text-neutral">
                Belum punya akun? silahkan daftar di{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-400 hover:text-blue-500 cursor-pointer"
                >
                  sini
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
