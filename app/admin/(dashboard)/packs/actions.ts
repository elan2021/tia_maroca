"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import fs from "fs/promises"
import path from "path"

async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const uploadDir = path.join(process.cwd(), "public/uploads")
  
  try {
    await fs.access(uploadDir)
  } catch {
    await fs.mkdir(uploadDir, { recursive: true })
  }
  
  const filePath = path.join(uploadDir, fileName)
  await fs.writeFile(filePath, buffer)
  
  return `/uploads/${fileName}`
}

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
  
  // Handled files
  const imageFile = formData.get("imageFile") as File
  const pdfFile = formData.get("pdfFile") as File

  const imageUrl = await uploadFile(imageFile) || ""
  const downloadUrl = await uploadFile(pdfFile) || ""

  // Handled modules
  const modulesCount = parseInt(formData.get("modulesCount") as string) || 0
  const modulesData = []

  for (let i = 0; i < modulesCount; i++) {
    const modTitle = formData.get(`moduleTitle_${i}`) as string
    const modDesc = formData.get(`moduleDesc_${i}`) as string
    const modImageFile = formData.get(`moduleImage_${i}`) as File

    if (modTitle || modDesc || (modImageFile && modImageFile.size > 0)) {
      const modImageUrl = await uploadFile(modImageFile) || ""
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

  // Handled files
  const imageFile = formData.get("imageFile") as File
  const pdfFile = formData.get("pdfFile") as File

  let imageUrl = pack.image
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadFile(imageFile) || pack.image
  }

  let downloadUrl = pack.downloadUrl || ""
  if (pdfFile && pdfFile.size > 0) {
    downloadUrl = await uploadFile(pdfFile) || downloadUrl
  }

  // Handled modules
  const modulesCount = parseInt(formData.get("modulesCount") as string) || 0
  const modulesData = []

  for (let i = 0; i < modulesCount; i++) {
    const modTitle = formData.get(`moduleTitle_${i}`) as string
    const modDesc = formData.get(`moduleDesc_${i}`) as string
    const modImageFile = formData.get(`moduleImage_${i}`) as File
    const modExistingImage = formData.get(`moduleExistingImage_${i}`) as string

    if (modTitle || modDesc || (modImageFile && modImageFile.size > 0) || modExistingImage) {
      let modImageUrl = modExistingImage || ""
      if (modImageFile && modImageFile.size > 0) {
        modImageUrl = await uploadFile(modImageFile) || modImageUrl
      }

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
