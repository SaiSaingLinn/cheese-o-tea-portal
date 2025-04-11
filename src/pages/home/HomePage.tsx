import { rootRoute } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { createRoute, useMatch, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/common/hooks/useModal";
import { PhoneInputForm } from "./components/PhoneInputForm";
import { OTPInputForm } from "./components/OTPInputForm";
import { toast } from "sonner";
import { useGetMenus } from "@/common/quries/menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/common/quries/category";
import { useCreateOrder } from "@/common/quries/order";
import HomeHeader from "./components/HomeHeader";
import Banner from "./components/Banner";
import MenuCard from "./components/MenuCard";

function HomePage() {
  const router = useRouter();
  const match = useMatch({ strict: false });
  const { openModal } = useModal();
  const [activeCategory, setActiveCategory] = useState("yogurt");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [phone, setPhone] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [itemId, setItemId] = useState<string>("");
  const [otpResetKey, setOtpResetKey] = useState(Date.now());
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const { data: menuItems, isFetching: isMenuItemsFetching } = useGetMenus();
  const { data: categories, isFetching: isCategoriesFetching } =
    useGetCategories();

  const { mutate, isPending } = useCreateOrder();

  // Scroll sync logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;

      for (let i = 0; i < categories?.length; i++) {
        const category = categories?.[i];
        const ref = sectionRefs.current[category?.name?.toLowerCase()];
        if (ref) {
          const offsetTop = ref.offsetTop;
          if (scrollTop >= offsetTop - 60) {
            setActiveCategory(category?.name?.toLowerCase());
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [menuItems, categories, router.state.location.pathname, match.id]);

  const scrollToCategory = (category: string) => {
    const section = sectionRefs.current[category];
    if (section && containerRef.current) {
      containerRef.current.scrollTo({
        top: section.offsetTop - 16,
        behavior: "smooth",
      });
    }
  };

  // Scroll category tab into view when activeCategory changes
  useEffect(() => {
    const activeRef = categoryRefs.current[activeCategory?.toLowerCase()];
    if (activeRef) {
      activeRef.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    const section = sectionRefs.current[activeCategory?.toLowerCase()];
    if (section && containerRef.current) {
      containerRef.current.scrollTo({
        top: section.offsetTop - 16,
        behavior: "smooth",
      });
    }
  }, [activeCategory, categories, router.state.location.pathname, match.id]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [router.state.location.pathname, match.id]);

  const handleSubmitPhone = (values: { phone: string }) => {
    setPhone(values.phone);
    setOtpResetKey(Date.now()); // will force OTPForm to remount
    toast.info("Your OTP is 007007");
  };

  const handleSubmitOTP = (values: { otp: string }) => {
    const order: Order = {
      phone: phone,
      otp: values.otp,
      status: "pending",
      items: [itemId],
      categoryId: categoryId,
    };
    mutate(order);
  };

  const handleOrderNow = (categoryId: string, itemId: string) => {
    setCategoryId(categoryId);
    setItemId(itemId);
    openModal({
      title: "Phone Number",
      content: <PhoneInputForm onSubmit={handleSubmitPhone} />,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <HomeHeader />
      <div>
        {!phone && <Banner />}
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
            <OTPInputForm
              key={otpResetKey}
              onSubmit={handleSubmitOTP}
              loading={isPending}
            />
          </>
        ) : (
          <>
            {isCategoriesFetching ? (
              <Skeleton className="h-6 w-full rounded-lg mb-4" />
            ) : (
              <div
                ref={containerRef}
                className="flex space-x-2 overflow-x-auto scrollbar-hide py-2"
              >
                {categories?.map((cat: { id: string; name: string }) => (
                  <Button
                    key={cat?.id}
                    ref={(el) =>
                      (categoryRefs.current[cat?.name?.toLowerCase()] = el)
                    }
                    onClick={() => scrollToCategory(cat?.name?.toLowerCase())}
                    variant={"outline"}
                    className={cn(
                      "text-xs whitespace-nowrap transition-colors border-2 font-semibold",
                      activeCategory?.toLowerCase() ===
                        cat?.name?.toLowerCase() &&
                        "text-primary border-primary hover:text-primary"
                    )}
                  >
                    {cat?.name}
                  </Button>
                ))}
              </div>
            )}

            {isMenuItemsFetching ? (
              <Skeleton className="h-24 w-full rounded-lg mb-4" />
            ) : menuItems?.length > 0 ? (
              <div
                ref={containerRef}
                className="overflow-y-auto h-[calc(100vh-100px)] p-2 space-y-6"
              >
                {categories?.map((cat: { id: string; name: string }) => (
                  <div
                    key={cat.id}
                    ref={(el) =>
                      (sectionRefs.current[cat?.name?.toLowerCase()] = el)
                    }
                  >
                    <div className="space-y-4">
                      {menuItems
                        ?.filter(
                          (item: { category: { name: string } }) =>
                            item?.category?.name.toLowerCase() ===
                            cat?.name?.toLowerCase()
                        )
                        ?.map(
                          (item: {
                            id: string;
                            name: string;
                            imageUrl?: string;
                            description?: string;
                            price: number;
                          }) => (
                            <MenuCard
                              key={item?.id}
                              item={item}
                              cat={cat}
                              handleOrderNow={handleOrderNow}
                            />
                          )
                        )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-sm text-gray-500 my-10">
                  No menu items available
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <HomePage />,
});
