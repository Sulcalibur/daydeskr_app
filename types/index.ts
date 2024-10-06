export interface Workspace {
  id: string
  name: string
  description: string
  image: string
  price: number
  location: {
    lat: number
    lng: number
  }
}

export interface Booking {
  id: string
  workspace: Workspace
  startTime: string
  duration: number
  status: 'upcoming' | 'completed' | 'cancelled'
}

export interface Listing {
  id: string
  name: string
  description: string
  price: number
}