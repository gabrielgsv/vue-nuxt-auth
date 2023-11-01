import { defineStore } from "pinia";

export type UserType = {
  id: number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  token: string;
};

const router = useRouter();

export const useAuthStore = defineStore({
  id: "auth",
  state: () =>
    ({
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null,
      returnUrl: null,
    } as {
      user: UserType | null;
      returnUrl: string | null;
    }),
  actions: {
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
