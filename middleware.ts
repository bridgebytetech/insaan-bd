import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

// HTML load করা
const maintenanceHTML = fs.readFileSync(path.join(process.cwd(), 'maintenance.html'), 'utf8')

export function middleware(req: NextRequest) {
  return new NextResponse(maintenanceHTML, {
    headers: { 'content-type': 'text/html' },
  })
}

export const config = {
  matcher: '/:path*', // সব route এ apply
}
