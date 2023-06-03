// works fine 
const GET_URL = "http://172.104.196.152:3000/user?user_id=1&token=blah"
const URL = "http://172.104.196.152:3000/note/create"
const SPHERES_GET_URL = "http://172.104.196.152:3000/sphere"; 
import { Thought, THOUGHTS, SPHERES, TYPES, DefaultThought, LifeSphere } from "app/Types";

export const getSpheres = async () => {
    fetch(SPHERES_GET_URL, { method: "GET" })
    .then(res => res.json())
    .then((res) => {
      return res.spheres.map((sphere, index) =>
      { return {title: sphere, id: index}});
    })
  };

export const getThoughts = async () => {
    fetch(GET_URL, { method: "GET" })
    .then((response) => response.json())
    .then((response) => {
        let thoughts = response.notes.map((note, index) => {
            return {
                id: note.id,
                sphere_id: parseInt(note.sphere_id),
                desc: note.desc,
                title: note.title,
                type_id: parseInt(note.type_id),
                type: TYPES[parseInt(note.type_id)],
            }
        })
        console.log("getThoughts: ", thoughts);
        return thoughts;
    })
    .catch((error) => console.log(error));
};