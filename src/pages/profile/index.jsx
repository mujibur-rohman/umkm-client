import Avatar from "@/components/Avatar/avatar"
import InputText from "@/components/InputText/InputText"

function Profile() {
  return (
    <section className="">
      <header className="bg-gradient-to-r grow from-blue-500 via-purple-500 to-pink-500 flex justify-center">
        <Avatar className="translate-y-1/2" changeAble size="xl"/>
      </header>
      <section className="w-full h-full px-10 md:px-28 lg:px-64flex justify-center">
        <div className="border-r-[1px] border-l-[1px] border-b-[1px] border-gray-200 rounded-b-lg pt-[4.8rem] pb-6 px-6">
          <h1 className="font-medium text-lg mb-3">My Profile</h1>
            <section className="flex flex-col gap-2">
              <InputText placeholder="Nama"/>
              <div>
              <InputText value="muji@gmail.com" disabled/>
              </div>
            </section>
        </div>
      </section>
    </section>
  )
}

export default Profile