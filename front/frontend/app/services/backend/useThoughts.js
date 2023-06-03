import { useState, useEffect } from "react"
import { getSpheres, getThoughts } from "../api/UserService"

export default function useThoughts() {
  const [thoughts, setThoughts] = useState([])

  useEffect(() => {
    let isSubscribed = true

    
    // const updateThoughts = async () => {
      // const thoughts = await getThoughts();
      // console.log("useThoughts.js THOUGHTS: ", thoughts);

      // if (isSubscribed) {
      //   console.log("IS SUBSCRIBED!", len(thoughts));
      //   setThoughts(
      //     thoughts.filter((t, index) => {
      //       console.log("T:", t, "life spheres", lifeSpheres, "types", types)
      //       return lifeSpheres[t.sphere_id] && types[t.type_id]
      //     }),
      //   )
      // }
    // }

    getThoughts().then((res) => {
      if (isSubscribed)
      {
        setThoughts(
          thoughts.filter((t, index) => {
            console.log("T:", t, "life spheres", lifeSpheres, "types", types)
            return lifeSpheres[t.sphere_id] && types[t.type_id]
          }))
      }
    })

    // updateThoughts().then((res) => console.log("update thoughts")).catch(console.error)

    return () => (isSubscribed = false)
  })

  return thoughts
}
