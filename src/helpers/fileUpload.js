export const fileUpload = async (file) => {
  if (!file) throw new Error('There is no image to upload.')
  const cloudUrl = 'https://api.cloudinary.com/v1_1/degv56qzk/upload'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'journalCloudinary')
  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) throw new Error('Could not upload image.')
    const cloudRes = await res.json()

    return cloudRes.secure_url
  } catch (error) {
    throw new Error(error.message)
  }
}