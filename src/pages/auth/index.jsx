"use client";

import Button from "@/components/Button/Button";
import InputPassword from "@/components/InputPassword/InputPassword";
import InputText from "@/components/InputText/InputText";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { Circles } from "react-loader-spinner";
import baseColor from "@/utils/baseColor";
import AuthService from "@/network/features/auth.api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Auth = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().trim().email(),
      password: yup.string().required().trim().min(6),
    }),
    onSubmit: async (values, formProps) => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (res.ok) {
          formProps.resetForm();
          router.push("/");
        }
        if (res.error) {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
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
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <h1 className="text-2xl font-medium mb-5 text-center mt-3">
              Login
            </h1>
            <div className="flex flex-col gap-3">
              <InputText
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                size="large"
                error={formik.errors.email && formik.touched.email}
                errorMessage={formik.touched.email && formik.errors.email}
                placeholder="Email"
              />
              <InputPassword
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                size="large"
                error={formik.errors.password && formik.touched.password}
                errorMessage={formik.touched.password && formik.errors.password}
                placeholder="Password"
              />
              <Button
                disabled={formik.isSubmitting}
                className="bg-primary flex justify-center hover:bg-primary-focus text-primary-content w-28"
              >
                {formik.isSubmitting ? (
                  <Circles
                    height="20"
                    width="20"
                    radius={20}
                    color={baseColor["primary-content"]}
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Log In"
                )}
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
