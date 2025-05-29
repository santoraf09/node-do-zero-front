import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://node-do-zero-hqr7.onrender.com'
})

function App() {
  const [videos, setVideos] = useState([])
  const [form, setForm] = useState({ title: '', description: '', duration: '' })

  async function fetchVideos() {
    const res = await api.get('/videos')
    setVideos(res.data)
  }

  async function createVideo(e) {
    e.preventDefault()
    await api.post('/videos', form)
    setForm({ title: '', description: '', duration: '' })
    fetchVideos()
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Meus Vídeos</h1>

        <form onSubmit={createVideo} className="space-y-4 mb-8 bg-white p-6 rounded shadow">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Título"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Descrição"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Duração (em segundos)"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Adicionar
          </button>
        </form>

        <ul className="space-y-4">
          {videos.map(video => (
            <li key={video.id} className="bg-white p-4 rounded shadow">
              <strong className="block text-lg">{video.title}</strong>
              <span className="text-sm text-gray-500">{video.duration}s</span>
              <p className="text-gray-700">{video.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App