import ProductAPI from "@/network/features/product.api";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function ProductDetail({ product }) {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  return (
    <section className="py-5 w-[50vw] mx-auto flex gap-3">
      <div className="border-[1px] grow rounded-lg p-3 flex gap-3 self-start">
        <img
          src={product.picture}
          alt="product"
          className="w-[15rem] object-cover rounded-xl self-start"
        />
        <div className="flex flex-col gap-3 justify-between">
          <div>
            <h1 className="font-bold text-2xl">{product.name}</h1>
            <p className="text-gray-500">{product.description}</p>
          </div>
          <h1 className="font-bold text-2xl text-blue-600">
            Rp. {product.price}
          </h1>
        </div>
      </div>
      <div className="border-[1px] self-start rounded-lg p-3 flex gap-3 min-w-[10rem]">
        <div className="flex flex-col gap-3 w-full">
          <div>
            <p>Total</p>
            <h1 className="font-bold text-2xl">Rp. {product.price}</h1>
          </div>
          <button className="text-sm bg-warning transition-colors hover:bg-warning-focus py-1 text-white rounded-md">
            Tambah Keranjang
          </button>
          {session?.data?.user ? (
            <button
              onClick={() => router.push(`/checkout/${product.id}`)}
              className="text-sm bg-primary transition-colors hover:bg-primary-focus py-1 text-white rounded-md"
            >
              Beli
            </button>
          ) : (
            <button
              onClick={() => router.push(`/auth`)}
              className="text-sm bg-primary transition-colors hover:bg-primary-focus py-1 text-white rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    const { productId } = context.query;
    const product = await ProductAPI.getOne(productId);
    return {
      props: {
        product,
        session,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default ProductDetail;
