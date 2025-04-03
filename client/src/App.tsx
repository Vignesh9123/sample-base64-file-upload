import React from 'react'

function App() {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File | null
    if (file) {
      if(file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB')
        return
      }
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = async() => {
        const base64 = fileReader.result
        console.log('base64', base64)
        const response = await fetch('https://sample-base64-file-upload.vercel.app/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ file: base64 })
        })
        const data = await response.json()
        console.log('data', data)
      }
    }
  }
  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" name="file" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default App
