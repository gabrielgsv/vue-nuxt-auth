export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user");
  if (to.path !== "/login" && (!user.value || user.value === "")) {
    return navigateTo("/login");
  }
});
