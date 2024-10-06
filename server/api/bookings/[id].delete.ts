export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing booking ID',
    })
  }

  // TODO: Implement actual booking cancellation logic using a database
  console.log(`Cancelling booking with ID: ${id}`)

  return { message: 'Booking cancelled successfully' }
})