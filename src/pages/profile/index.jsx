import Avatar from "@/components/Avatar/avatar";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import InputText from "@/components/InputText/InputText";
import { useState } from "react";
import InputPassword from "@/components/InputPassword/InputPassword";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import AuthService from "@/network/features/auth.api";
import acceptedImages, { sizeImage } from "@/utils/acceptedImages";

function Profile() {
  const [disableName, setDisableName] = useState(true);
  const [srcPic, setSrcPic] = useState("");
  const { data: session, update } = useSession();
  console.log(session.user);

  // handler image
  const changeProfilePic = async (e) => {
    try {
      // set blob
      const img = e.target.files[0];
      if (!acceptedImages.includes(img.type)) {
        throw new Error("Gambar yang diupload tidak valid");
      }
      if (img.size > sizeImage) {
        throw new Error("Minimal ukuran gambar 2MB");
      }
      const blob = URL.createObjectURL(img);
      setSrcPic(blob);
      const formData = new FormData();
      formData.append("profilePicture", img);
      const newPic = await AuthService.updateProfilePic(
        session.user.uuid,
        formData
      );
      await update({
        ...session,
        user: {
          ...session?.user,
          name: "Mujay",
          profilePicture: newPic.data,
        },
      });
      toast.success("Foto Profil Berhasil Diubah");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // handler name
  const changeHandlerName = async (e) => {
    try {
      console.log(e.target.value);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <header className="bg-gradient-to-r grow from-blue-500 via-purple-500 to-pink-500 flex justify-center">
        <Avatar
          className="translate-y-1/2"
          changeAble
          size="xl"
          name={session.user.name}
          src={session.user.profilePicture || srcPic}
          onChange={changeProfilePic}
        />
      </header>
      <section className="w-full h-full px-10 md:px-28 lg:px-64flex justify-center">
        <div className="border-r-[1px] border-l-[1px] border-b-[1px] border-gray-200 rounded-b-lg pt-[4.8rem] pb-6 px-6">
          <h1 className="font-medium text-lg mb-3">My Profile</h1>
          <section className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full">
                <label>Nama</label>
                <div className="flex gap-2">
                  <InputText
                    placeholder="Nama"
                    value={session.user.name}
                    disabled={disableName}
                    onChange={changeHandlerName}
                  />
                  {disableName ? (
                    <button
                      onClick={() => setDisableName(false)}
                      className="bg-warning hover:bg-warning-focus rounded transition-all text-white px-2 py-1"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setDisableName(true)}
                      className="bg-success hover:bg-success-focus rounded transition-all text-white px-2 py-1"
                    >
                      Simpan
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full">
                <label>Email</label>
                <div className="flex gap-2">
                  <InputText value="muji@gmail.com" disabled />
                  <button className="bg-primary rounded hover:bg-primary-focus transition-all text-white px-2 py-1">
                    Verifikasi
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="mt-4 border-[1px] rounded p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full">
              <label>Password Lama</label>
              <div className="flex gap-2">
                <InputPassword placeholder="Password Lama" />
              </div>
            </div>
            <div className="w-full">
              <label>Password Baru</label>
              <div className="flex gap-2">
                <InputPassword placeholder="Password Baru" />
              </div>
            </div>
          </div>
          <button className="bg-primary mt-2 rounded hover:bg-primary-focus transition-all text-white px-2 py-1">
            Ganti Password
          </button>
        </section>
      </section>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}

export default Profile;
