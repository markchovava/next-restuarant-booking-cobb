export const AsideNavData = [
    {
        id: 0, 
        name: "Home", 
        iconType: "home", 
        href: "/"
    },
    {
        id: 1, 
        name: "Dashboard", 
        iconType: "dashboard", 
        href: "/admin"
    },
    {
        id: 2, 
        name: "Admin Booking", 
        iconType: "book-form", 
        href: "/admin/book-form"
    },
]


export const AdminNavData = [
    {
        id: 1, 
        name: "App Information", 
        iconType: "info", 
        css: "from-blue-600 to-blue-900 hover:from-blue-600 hover:to-blue-950 hover:bg-linear-to-br", 
        href: "/admin/app-info"
    },
    {
        id: 2, 
        name: "Profile", 
        iconType: "user", 
        css: "from-pink-600 to-pink-900 hover:from-pink-600 hover:to-pink-950 hover:bg-linear-to-br", 
        href: "/admin/profile"
    },
    {
        id: 3, 
        name: "Users", 
        iconType: "group", 
        css: "from-green-600 to-green-900 hover:from-green-600 hover:to-green-950 hover:bg-linear-to-br", 
        href: "/admin/user"
    },
    {
        id: 7, 
        name: "Locations", 
        iconType: "map", 
        css: "from-cyan-600 to-cyan-900 hover:from-cyan-600 hover:to-cyan-950 hover:bg-linear-to-br", 
        href: "/admin/location"
    },
    {
        id: 4, 
        name: "Bookings", 
        iconType: "booking", 
        css: "from-violet-600 to-violet-900 hover:from-violet-600 hover:to-violet-950 hover:bg-linear-to-br", 
        href: "/admin/booking"
    },
    /* {
        id: 5, 
        name: "Messages", 
        iconType: "message", 
        css: "from-zinc-600 to-zinc-900 hover:from-zinc-600 hover:to-zinc-950 hover:bg-linear-to-br", 
        href: "/admin/message"
    }, */
    {
        id: 6, 
        name: "Tables", 
        iconType: "table", 
        css: "from-rose-600 to-rose-900 hover:from-rose-600 hover:to-rose-950 hover:bg-linear-to-br", 
        href: "/admin/table"
    },
]



export const BookingNavData = [
    {
        id: 1, 
        name: "Location Bookings", 
        iconType: "map", 
        css: "from-blue-600 to-blue-900 hover:from-blue-600 hover:to-blue-950 hover:bg-linear-to-br", 
        href: "/admin/booking/location"
    },
    {
        id: 2, 
        name: "Table Booking", 
        iconType: "table", 
        css: "from-pink-600 to-pink-900 hover:from-pink-600 hover:to-pink-950 hover:bg-linear-to-br", 
        href: "/admin/booking/table"
    },
    {
        id: 3, 
        name: "User Bookings", 
        iconType: "user", 
        css: "from-green-600 to-green-900 hover:from-green-600 hover:to-green-950 hover:bg-linear-to-br", 
        href: "/admin/booking/user"
    },
]


export const MainNavData = [
  {id: 1, name: "Cancellation Policy", href: "/policy/cancel"},
  {id: 2, name: "Reservation Policy", href: "/policy/reservation"},
  {id: 3, name: "Contact Us", href: "/contact"},
]