import png from "@/assets/images/banner.png";

export default function Banner() {
  return (
    <div className="px-4 py-2 bg-white rounded-t-lg">
      <p className="text-center text-md font-semibold font-rubik mb-1">
        Welcome to Cheese O'Tea
      </p>
      <img
        src={png}
        alt="Banner"
        className="w-full object-cover rounded-b-lg"
      />
    </div>
  );
}
