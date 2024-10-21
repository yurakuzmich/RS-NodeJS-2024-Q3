import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user-model';

export const users: User[] = [
    {
        id: '8edb94e5-c760-4efc-be81-e61361f8f6c3',
        username: "john_doe",
        age: 28,
        hobbies: ["reading", "cycling", "coding"]
    },
    {
        id: '10a9d42f-4a37-43d9-8ea2-93b10eaea4eb',
        username: "jane_smith",
        age: 34,
        hobbies: ["painting", "yoga", "traveling"]
    },
    {
        id: '00129ac5-893c-430a-830d-9e62a88fdebb',
        username: "alice_wonder",
        age: 22,
        hobbies: ["gaming", "photography", "blogging"]
    },
    {
        id: '8329e239-43a9-4cf1-99ab-5a78b8355b82',
        username: "mike_hunt",
        age: 45,
        hobbies: ["hiking", "fishing", "cooking"]
    },
    {
        id: '4b4b4994-5219-4d04-bdd0-436f8eaed9c4',
        username: "sara_parker",
        age: 19,
        hobbies: ["dancing", "swimming", "watching movies"]
    },
    {
        id: '3e134c9b-d4aa-431b-8d89-78624f5835f4',
        username: "david_jones",
        age: 30,
        hobbies: ["gardening", "board games", "guitar playing"]
    },
    {
        id: '9e41c01d-d5fa-4d11-8945-42c9da9e32cb',
        username: "emma_clark",
        age: 26,
        hobbies: ["fashion design", "volunteering", "running"]
    },
    {
        id: '29f050eb-ef86-4baf-9714-4402c288da74',
        username: "lucas_martin",
        age: 39,
        hobbies: ["photography", "skateboarding", "collecting stamps"]
    },
    {
        id: '4f132990-3a39-4837-8a26-102f7a9b7774',
        username: "chloe_lee",
        age: 23,
        hobbies: ["surfing", "rock climbing", "calligraphy"]
    },
    {
        id: '008f56a8-c793-4d7e-b9e6-05e4174d395d',
        username: "brad_peters",
        age: 50,
        hobbies: ["woodworking", "birdwatching", "wine tasting"]
    }
];
