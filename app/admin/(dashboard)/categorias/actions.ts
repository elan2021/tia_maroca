"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCategoryAction(formData: FormData) {
  const name = formData.get("name") as string
  const icon = formData.get("icon") as string
  const color = formData.get("color") as string

  if (!name || !icon || !color) {
    throw new Error("Preencha todos os campos obrigatórios")
  }

  await db.category.create({
    data: { name, icon, color }
  })

  revalidatePath("/")
  revalidatePath("/admin/categorias")
  revalidatePath("/admin/packs")
  redirect("/admin/categorias")
}

export async function updateCategoryAction(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const icon = formData.get("icon") as string
  const color = formData.get("color") as string

  if (!name || !icon || !color) {
    throw new Error("Preencha todos os campos obrigatórios")
  }

  await db.category.update({
    where: { id },
    data: { name, icon, color }
  })

  revalidatePath("/")
  revalidatePath("/admin/categorias")
  revalidatePath("/admin/packs")
  redirect("/admin/categorias")
}

export async function deleteCategoryAction(id: string) {
  await db.category.delete({
    where: { id }
  })

  revalidatePath("/")
  revalidatePath("/admin/categorias")
  revalidatePath("/admin/packs")
}
