import { z } from 'zod'

const searchSchema = z.object({
  query: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { query } = searchSchema.parse(body)

  // TODO: Implement actual search logic using a database
  const mockWorkspaces = [
    {
      id: '1',
      name: 'Cozy Corner Office',
      description: 'A quiet corner office perfect for focused work.',
      image: 'https://example.com/cozy-corner.jpg',
      price: 25,
      location: { lat: 40.7128, lng: -74.0060 },
    },
    {
      id: '2',
      name: 'Creative Studio',
      description: 'An inspiring studio space for creative professionals.',
      image: 'https://example.com/creative-studio.jpg',
      price: 35,
      location: { lat: 40.7112, lng: -74.0055 },
    },
  ]

  return mockWorkspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(query.toLowerCase()) ||
    workspace.description.toLowerCase().includes(query.toLowerCase())
  )
})