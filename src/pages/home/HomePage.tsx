import { rootRoute } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { createRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/common/hooks/useModal";
import { PhoneInputForm } from "./components/PhoneInputForm";
import { OTPInputForm } from "./components/OTPInputForm";
import { toast } from "sonner";
import { useGetMenuItems } from "@/common/quries/menuItem";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  "Yogurt",
  "Bubble Tea",
  "Coffee",
  "Smoothie",
  "Soda",
  "Fruit",
];

// const menuItems = [
//   {
//     name: "Passion Yogurt",
//     price: 5000,
//     description:
//       "Natural fermented yogurt from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Yogurt",
//     category: "Yogurt",
//   },
//   {
//     name: "Orange Yogurt",
//     price: 5000,
//     description:
//       "Natural fermented yogurt from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Yogurt",
//     category: "Yogurt",
//   },
//   {
//     name: "Passion Yogurt",
//     price: 5000,
//     description:
//       "Natural fermented yogurt from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Yogurt",
//     category: "Yogurt",
//   },
//   {
//     name: "Orange Bubble Tea",
//     price: 5000,
//     description:
//       "Natural fermented Bubble Tea from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Bubble Tea",
//     category: "Bubble Tea",
//   },
//   {
//     name: "Passion Bubble Tea",
//     price: 5000,
//     description:
//       "Natural fermented Bubble Tea from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Bubble Tea",
//     category: "Bubble Tea",
//   },
//   {
//     name: "Orange Coffee",
//     price: 5000,
//     description:
//       "Natural fermented Coffee from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Coffee",
//     category: "Coffee",
//   },
//   {
//     name: "Passion Coffee",
//     price: 5000,
//     description:
//       "Natural fermented Coffee from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Coffee",
//     category: "Coffee",
//   },
//   {
//     name: "Orange Coffee",
//     price: 5000,
//     description:
//       "Natural fermented Coffee from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Coffee",
//     category: "Coffee",
//   },
//   {
//     name: "Orange Smoothie",
//     price: 5000,
//     description:
//       "Natural fermented Smoothie from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Smoothie",
//     category: "Smoothie",
//   },
//   {
//     name: "Passion Smoothie",
//     price: 5000,
//     description:
//       "Natural fermented Smoothie from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Smoothie",
//     category: "Smoothie",
//   },
//   {
//     name: "Orange Smoothie",
//     price: 5000,
//     description:
//       "Natural fermented Smoothie from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Smoothie",
//     category: "Smoothie",
//   },
//   {
//     name: "Passion Soda",
//     price: 5000,
//     description:
//       "Natural fermented Soda from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Soda",
//     category: "Soda",
//   },
//   {
//     name: "Orange Soda",
//     price: 5000,
//     description:
//       "Natural fermented Soda from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Soda",
//     category: "Soda",
//   },
//   {
//     name: "Passion Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Fruit",
//     category: "Fruit",
//   },
//   {
//     name: "Orange Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Fruit",
//     category: "Fruit",
//   },
//   {
//     name: "Passion Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Fruit",
//     category: "Fruit",
//   },
//   {
//     name: "Orange Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Fruit",
//     category: "Fruit",
//   },
//   {
//     name: "Orange Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Fruit",
//     category: "Fruit",
//   },
//   {
//     name: "Passion Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and passion fruit.",
//     image: "https://placehold.co/150/FFEE00/000000?text=Passion+Fruit",
//     category: "Fruit",
//   },
//   {
//     name: "Orange Fruit",
//     price: 5000,
//     description:
//       "Natural fermented Fruit from pure fresh milk and orange fruit.",
//     image: "https://placehold.co/150/FFA500/000000?text=Orange+Fruit",
//     category: "Fruit",
//   },
// ];

function HomePage() {
  const { openModal } = useModal();
  const [activeCategory, setActiveCategory] = useState("Yogurt");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [phone, setPhone] = useState<string>("");
  const [otpResetKey, setOtpResetKey] = useState(Date.now());

  const { data, isFetching } = useGetMenuItems();
  console.log("data", data);

  // Scroll sync logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const ref = sectionRefs.current[category];
        if (ref) {
          const offsetTop = ref.offsetTop;
          if (scrollTop >= offsetTop - 60) {
            setActiveCategory(category);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  const scrollToCategory = (category: string) => {
    const section = sectionRefs.current[category];
    if (section && containerRef.current) {
      containerRef.current.scrollTo({
        top: section.offsetTop - 16,
        behavior: "smooth",
      });
    }
  };

  // Inside your MenuPage component (additions)
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll category tab into view when activeCategory changes
  useEffect(() => {
    const activeRef = categoryRefs.current[activeCategory];
    if (activeRef) {
      activeRef.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const handleSubmitPhone = (values: { phone: string }) => {
    console.log("values", values);
    setPhone(values.phone);
    setOtpResetKey(Date.now()); // will force OTPForm to remount
    toast.info("Your OTP is 007007");
  };

  const handleSubmitOTP = (values: { otp: string }) => {
    console.log("values", values);
  };

  return (
    <div className="max-w-md mx-auto h-screen overflow-hidden bg-white">
      {/* <div className="text-center py-4 font-bold text-xl">Welcome to Cheese O’Tea.</div> */}

      {/* <div className="sticky top-0 bg-white z-10 px-2">
        <Tabs value={activeCategory} className="overflow-x-auto no-scrollbar">
          <TabsList className="flex gap-2 justify-start">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className={cn(
                  "min-w-[100px]",
                  activeCategory === cat &&
                    "border-b-2 border-red-500 text-red-600"
                )}
                onClick={() => scrollToCategory(cat)}
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div> */}
      {phone ? (
        <>
          <div className="space-y-4 px-4 py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Current Phone Number</p>
              <Button
                className="text-xs px-3 py-1"
                variant="link"
                onClick={() =>
                  openModal({
                    title: "Phone Number",
                    content: <PhoneInputForm onSubmit={handleSubmitPhone} />,
                  })
                }
              >
                Change
              </Button>
            </div>
            <p className="text-sm font-semibold">{phone}</p>
          </div>
          <OTPInputForm key={otpResetKey} onSubmit={handleSubmitOTP} />
        </>
      ) : (
        <>
          <div
            ref={containerRef}
            className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 py-2"
          >
            {categories?.map((cat, i) => (
              <button
                key={i}
                ref={(el) => (categoryRefs.current[cat] = el)}
                onClick={() => scrollToCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                  activeCategory === cat
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-200 text-gray-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          {isFetching ? (
            <Skeleton className="h-24 w-full rounded-lg mb-4" />
          ) : (
            data && (
              <div
                ref={containerRef}
                className="overflow-y-auto h-[calc(100vh-100px)] p-2 space-y-6"
              >
                {categories?.map((category, i) => (
                  <div
                    key={i}
                    ref={(el) => (sectionRefs.current[category] = el)}
                  >
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                      {category}
                    </h2>
                    <div className="space-y-4">
                      {data
                        ?.filter(
                          (item: { category: { name: string } }) =>
                            item?.category?.name.toLowerCase() === category.toLowerCase()
                        )
                        ?.map(
                          (item: {
                            category: { name: string };
                            id: string;
                            name: string;
                            imageUrl?: string;
                            description?: string;
                            price: string;
                          }) => (
                            <div
                              key={item?.id}
                              className="p-3 border rounded-xl flex items-start gap-4 shadow"
                            >
                              <img
                                src={item.imageUrl || `https://placehold.co/150/FFEE00/000000?text=${item.name}`}
                                alt={item.name}
                                className="w-16 h-16 rounded object-cover"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-base">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {item.description}
                                </div>
                                <div className="font-medium text-red-500 mt-1">
                                  {item.price.toLocaleString()} Ks
                                </div>
                              </div>
                              <Button
                                className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
                                onClick={() =>
                                  openModal({
                                    title: "Phone Number",
                                    content: (
                                      <PhoneInputForm
                                        onSubmit={handleSubmitPhone}
                                      />
                                    ),
                                  })
                                }
                              >
                                ORDER NOW
                              </Button>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <HomePage />,
});
