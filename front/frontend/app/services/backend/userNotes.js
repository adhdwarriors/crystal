
import { useState, useEffect } from 'react';
import {getNotes} from './note_create';


export function filterOnTopics(thoughts, spheres) 
{
    return thoughts.filter((thought: any, index: number) => spheres[thought.sphere_id])
}

export function filterOnTypes(thoughts, types) 
{
    return thoughts.filter((thought: any, index: number) => types[thought.type_id])
}

export default function useNotes(user_id) {
    const [notes, setNotes] = useState([]);
  
    useEffect(() => {
        
        const updateNotes = async () => {
            const n = await getNotes(user_id);
            return n;
        }
        updateNotes().then(response => setNotes(response)).catch(console.error);
        return () => isSubscribed = false;
    }, [])

    return notes
}