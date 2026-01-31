// middleware.ts (project root)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// আপনার HTML এখানে inline করা হলো
const maintenanceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>InsaanBD | Under Construction</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  </style>
</head>

<body class="bg-black text-white flex items-center justify-center min-h-screen">

  <div class="text-center max-w-xl px-6">

    <!-- Animated Icon -->
    <div class="flex justify-center mb-6 animate-float">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 6v6l4 2M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
      </svg>
    </div>

    <!-- Heading -->
    <h1 class="text-4xl font-bold tracking-wide mb-3">
      Site Under Construction
    </h1>

    <p class="text-gray-400 mb-6 leading-relaxed">
      The <span class="text-white font-semibold">InsaanBD</span> website is currently
      being crafted with care.<br />
      Please check back soon.
    </p>

    <!-- Divider -->
    <div class="h-px w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-8"></div>

    <!-- Developer Credit -->
    <p class="text-sm text-gray-500 mb-4">
      Developed by <span class="text-white font-medium">Bridge Byte Tech</span>
    </p>

    <!-- Social Icons -->
    <div class="flex justify-center gap-6">

      <!-- Website -->
      <a href="https://bridgebytetech.com" target="_blank"
         class="group border border-gray-700 p-3 rounded-full hover:border-indigo-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M2.05 12h19.9M12 2.05c2.5 2.74 4 6.32 4 9.95s-1.5 7.21-4 9.95c-2.5-2.74-4-6.32-4-9.95s1.5-7.21 4-9.95z"/>
        </svg>
      </a>

      <!-- Facebook -->
      <a href="https://facebook.com/bridgebytetech" target="_blank"
         class="group border border-gray-700 p-3 rounded-full hover:border-indigo-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
             viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12H16l-.4 3h-2.4v7A10 10 0 0022 12z"/>
        </svg>
      </a>

      <!-- Instagram -->
      <a href="https://instagram.com/bridgebytetech" target="_blank"
         class="group border border-gray-700 p-3 rounded-full hover:border-indigo-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
             viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
        </svg>
      </a>

      <!-- YouTube -->
      <a href="https://youtube.com/@bridgebytetech" target="_blank"
         class="group border border-gray-700 p-3 rounded-full hover:border-indigo-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-indigo-500"
             viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 7.5s-.2-1.7-.8-2.4c-.8-.8-1.7-.8-2.1-.9C16.8 4 12 4 12 4h0s-4.8 0-8.1.2c-.4 0-1.3.1-2.1.9C1.2 5.8 1 7.5 1 7.5S.8 9.5.8 11.5v1c0 2 .2 4 .2 4s.2 1.7.8 2.4c.8.8 1.9.8 2.4.9 1.7.2 7.8.2 7.8.2s4.8 0 8.1-.2c.4 0 1.3-.1 2.1-.9.6-.7.8-2.4.8-2.4s.2-2 .2-4v-1c0-2-.2-4-.2-4zM9.8 14.6V8.9l5.4 2.9-5.4 2.8z"/>
        </svg>
      </a>

    </div>

  </div>

</body>
</html>
`;

export function middleware(req: NextRequest) {
  return new NextResponse(maintenanceHTML, {
    headers: { "content-type": "text/html" },
  });
}

// apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
