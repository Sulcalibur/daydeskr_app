export default defineEventHandler(async (event) => {
  // TODO: Implement actual booking retrieval logic using a database
  const mockBookings = [
    {
      id: '1',
      workspace: {
        id: '1',
        name: 'Cozy Corner Office',
        description: 'A quiet corner office perfect for focused work.',
        image: 'https://example.com/cozy-corner.jpg',
        price: 25,
        location: { lat: 40.7128, lng: -74.0060 },
      },
      startTime: '2024-04-15T09:00:00Z',
      duration: 4,
      status: 'upcoming',
    },
    {
      id: '2',
      workspace: {
        id: '2',
        name: 'Creative Studio',
        description: 'An inspiring studio space for creative professionals.',
        image: 'https://example.com/creative-studio.jpg',
        price: 35,
        location: { lat: 40.7112, lng: -74.0055 },
      },
      startTime: '2024-04-10T13:00:00Z',
      duration: 2,
      status: 'completed',
    },
  ]

  return mockBookings
})