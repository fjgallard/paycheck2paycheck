export interface Budget {
  id?      : string
  limit    : number
  icon?    : string
  duration : 'month' | 'week' | 'year' | 'other' 
  createdAt: Date
  consumed?: number
}