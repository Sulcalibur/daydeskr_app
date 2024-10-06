export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    // TODO: Implement actual listing retrieval logic using a database
    const mockListings = [
      {
        id: '1',
        name: 'Downtown Office Space',
        description: 'Modern office space in the heart of downtown.',
        price: 30,
      },
      {
        id: '2',
        name: 'Suburban Co-working Hub',
        description: 'Quiet co-working space in a suburban area.',
        price: 20,
      },
    ]

    return mockListings
  } else if (event.node.req.method === 'POST') {
    const body = await readBody(event)
    // TODO: Implement actual listing creation logic using a database
    console.log('Creating new listing:', body)

    return {
      id: '3',
      ...body,
    }
  }
})