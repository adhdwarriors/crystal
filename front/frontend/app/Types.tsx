
type LifeSphere = {
    id: number;
    title: string;
}

type Thought = {
    id: number;
    sphere_id: number;
    title: string;
    desc: string;
    type_id: number;
    type: string;
}

type Type = {
    id: number;
    title: string;
}

const DefaultSphere: LifeSphere = {id: 0, title: "Gym"};
const TYPES: Type[] = [{id: 0, title: "Task"}, {id: 1, title: "Goal"}, {id: 2, title: "Idea"}, {id: 3, title: "Thought"}]
const DefaultThought: Thought = {id: 0, sphere_id: 0, title: "", desc: "", type_id: 3, type: "Thought"};
const THOUGHTS: Thought[] = [{id: 0, sphere_id: 0, title: "Hello", desc: "I like mamba", type_id: 3, type: "Thought"}]
const SPHERES: LifeSphere[] = [{id: 0, title: "Gym"}, {id: 1, title: "Orchestra"}, {id: 2, title: "Finance"}]

export { LifeSphere, Thought, TYPES, SPHERES, THOUGHTS, DefaultThought, DefaultSphere }