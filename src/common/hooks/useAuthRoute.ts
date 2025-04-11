import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

export function useAuthRoute() {
  const { user } = useUserStore();
  const { location } = useRouterState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && location?.pathname.includes("/admin")) {
      navigate({
        to: "/",
      });
    }
    // if (user) {
    //   navigate({
    //     to,
    //     replace: true,
    //   });
    // }
  }, [user, location]);
}

// export function useIsAuthRoute() {
//   const { user } = useUserStore();
//   const { location } = useRouterState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user && location?.pathname !== "/") {
//       navigate({
//         to: "/",
//       });
//     }
//   }, [user]);
// }
