"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPackAction(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const tags = formData.get("tags") as string
  const ageRange = formData.get("ageRange") as string
  const pages = parseInt(formData.get("pages") as string) || 0
  const format = formData.get("format") as string
  const fileSize = formData.get("fileSize") as string
  const isNew = formData.get("isNew") === "on"
  const type = formData.get("type") as string || "pack"
  let kiwifyId = formData.get("kiwifyId") as string || null
  if (kiwifyId && kiwifyId.trim() === "") kiwifyId = null
  
  // URLs already uploaded from client
  const imageUrl = formData.get("imageUrl") as string || ""
  const downloadUrl = formData.get("downloadUrl") as string || ""

  // Modules
  const modulesCount = parseInt(formData.get("modulesCount") as string) || 0
  const modulesData = []

  for (let i = 0; i < modulesCount; i++) {
    const modTitle = formData.get(`moduleTitle_${i}`) as string
    const modDesc = formData.get(`moduleDesc_${i}`) as string
    const modImageUrl = formData.get(`moduleImageUrl_${i}`) as string || ""

    if (modTitle || modDesc || modImageUrl) {
      modulesData.push({
        title: modTitle || "",
        description: modDesc || "",
        image: modImageUrl
      })
    }
  }

  const modulesJson = JSON.stringify(modulesData)

  await db.pack.create({
    data: {
      title,
      description,
      image: imageUrl,
      category,
      tags,
      ageRange,
      pages,
      format,
      fileSize,
      downloadUrl,
      isNew,
      type,
      kiwifyId,
      modulesJson,
    }
  })
  
  revalidatePath("/admin/packs")
  revalidatePath("/membros")
  redirect("/admin/packs")
}

export async function updatePackAction(id: string, formData: FormData) {
  const pack = await db.pack.findUnique({ where: { id } })
  if (!pack) throw new Error("Pack not found")

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const tags = formData.get("tags") as string
  const ageRange = formData.get("ageRange") as string
  const pages = parseInt(formData.get("pages") as string) || pack.pages
  const format = formData.get("format") as string
  const fileSize = formData.get("fileSize") as string
  const isNew = formData.get("isNew") === "on"
  const type = formData.get("type") as string || "pack"
  let kiwifyId = formData.get("kiwifyId") as string || null
  if (kiwifyId && kiwifyId.trim() === "") kiwifyId = null

  // URLs already uploaded from client (empty = keep existing)
  const newImageUrl = formData.get("imageUrl") as string
  const newDownloadUrl = formData.get("downloadUrl") as string

  const imageUrl = newImageUrl || pack.image
  const downloadUrl = newDownloadUrl || pack.downloadUrl || ""

  // Modules
  const modulesCount = parseInt(formData.get("modulesCount") as string) || 0
  const modulesData = []

  for (let i = 0; i < modulesCount; i++) {
    const modTitle = formData.get(`moduleTitle_${i}`) as string
    const modDesc = formData.get(`moduleDesc_${i}`) as string
    const modImageUrl = formData.get(`moduleImageUrl_${i}`) as string || ""

    if (modTitle || modDesc || modImageUrl) {
      modulesData.push({
        title: modTitle || "",
        description: modDesc || "",
        image: modImageUrl
      })
    }
  }

  const modulesJson = JSON.stringify(modulesData)

  await db.pack.update({
    where: { id },
    data: {
      title,
      description,
      image: imageUrl,
      category,
      tags,
      ageRange,
      pages,
      format,
      fileSize,
      downloadUrl,
      isNew,
      type,
      kiwifyId,
      modulesJson,
    }
  })
  
  revalidatePath("/admin/packs")
  revalidatePath("/membros")
  revalidatePath(`/membros/pack/${id}`)
  redirect("/admin/packs")
}
