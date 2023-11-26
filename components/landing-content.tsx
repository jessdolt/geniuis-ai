"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

const testimonials = [
  {
    name: "Izle",
    avatar:
      "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/356081958_3651587651738267_6914317619796272185_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEbtRUWU4gG4V080NUn_ozdR3hKB5xXsDNHeEoHnFewM1U9n77A-nJmjVKjcWxwRWhQXm_GAvXh_AHy6CyQrXJT&_nc_ohc=Nm9O2_nCS-oAX8ZLOIY&_nc_oc=AQmTP6n3tsSt6dzacmuUSS6z22UDufOn9RRsOqvMkFFuiWpwAu0yRXtXbHN-r8uyKTw&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfD93bEBEU8xp-AuHhTKvgsKMKgf4hkSK7dLcl4tcLuDhw&oe=655B48B6",
    title: "Platform Support Associate",
    description:
      "This app is a game-changer. Efficient, user-friendly, and packed with powerful features!",
  },
  {
    name: "Gian",
    avatar:
      "https://images.pexels.com/photos/4022812/pexels-photo-4022812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Software Engineer",
    description:
      "Transformative experience! This app streamlines processes, enhances collaboration. A must for anyone seeking productivity and organization in one.",
  },
  {
    name: "Anna",
    avatar:
      "https://images.pexels.com/photos/4926674/pexels-photo-4926674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Journalist",
    description:
      "Saves me time and headaches daily. Intuitive design, seamless navigation. A must-have tool for boosting productivity",
  },
  {
    name: "Liza",
    avatar:
      "https://images.pexels.com/photos/4656102/pexels-photo-4656102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Model",
    description:
      "Incredible app! Simplifies tasks effortlessly. The perfect blend of functionality and simplicity. Can't imagine work without it",
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20 ">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="flex items-center gap-4 w-full">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={item?.avatar}
                      className="w-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title}</p>
                  </div>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
