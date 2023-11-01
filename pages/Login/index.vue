<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { z } from "zod";
import { login } from "./service";

const router = useRouter();
const toast = useToast();
const user = useCookie("user");

const schema = z.object({
  username: z.string().min(1, { message: "O nome de usuário é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

type Schema = z.output<typeof schema>;

const loginState = reactive<Schema>({
  username: "",
  password: "",
});

function onSubmit(event: FormSubmitEvent<Schema>) {
  const { username, password } = event.data;
  return login(username, password)
    .then((data) => {
      user.value = JSON.stringify(data);
      router.push("/");
    })
    .catch(() => {
      toast.add({
        title: "Erro",
        description: "Nome de usuário ou senha inválidos",
        color: "red",
        timeout: 8000,
      });
    });
}
</script>

<template>
  <UContainer class="container">
    <UForm :schema="schema" :state="loginState" @submit="onSubmit">
      <UFormGroup class="input" label="Nome de usuário" name="username">
        <UInput v-model="loginState.username" />
      </UFormGroup>

      <UFormGroup class="input" label="Senha" name="password">
        <UInput v-model="loginState.password" />
      </UFormGroup>

      <UButton type="submit">Entrar</UButton>
    </UForm>
  </UContainer>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.input {
  width: 300px;
  margin: 30px 0;
}

button {
  float: right;
}
</style>
