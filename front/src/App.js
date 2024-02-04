import React, { useState } from 'react'

const App = () => {
  const [file, setFile] = useState(null)
  const [response, setResponse] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8081/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      setResponse(result)
    } catch (error) {
      console.error('Error:', error)
      setResponse({ error: 'Error uploading file.' })
    }
  }

  return (
    <div>
      <h1>File Upload (React)</h1>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <button onClick={uploadFile}>Upload</button>
      <div>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
