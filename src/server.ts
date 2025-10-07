import express from 'express';    // Your other application code follows
const app = express();
import * as fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// READ AND WRITE FILE SYSTEM
// # 1
fs.readFile('src/text.txt', 'utf8',(error, data) => {
    if (error) { 
        console.error('Error reading file:', error); 
        return;
    }
    console.log(data)
    }
)
console.log("Hello before server will crash");
console.log(`__dirname is ===> ${path.dirname('src/server.ts')}`);

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    process.exit(1); // Exit the process to avoid undefined state
});

type UserType = {
    id: number;
    username: string;
    age: number;
}
type NewUserFromRequestBody = Omit<UserType, 'id'>;

type QueryParams = {
    filter: string;
}

const UsersList: Array<UserType> = [
    { id: 1, username: "John", age: 23 },
    { id: 2, username: "Aaron", age: 13 },
    { id: 3, username: "Sarah", age: 68 },
    { id: 4, username: "Rory", age: 43 },
    { id: 5, username: "Tony", age: 34 },
    { id: 6, username: "Gaga", age: 21 },
    { id: 7, username: "David", age: 29 }
]

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
// get all users
app.get('/api/users', (req, res) => { 
    const {filter} = req.query as QueryParams;
    console.log(`filter is ===> ${filter}`);
    if (!filter) { return res.status(200).json([...UsersList]) }
    if (filter ) {
        const result = UsersList.find(user => user.username.toLowerCase().includes(filter));
        return res.status(200).send(result)
        }
    }
)
// get user by id
app.get('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    else{
        const user = UsersList.find(u => u.id === userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
});
// POST request to create a new user
app.use(express.json());
app.post('/api/users', (req, res) => {
    const newUserData: NewUserFromRequestBody = req.body;
    console.log(`request body is ===> ${JSON.stringify(newUserData)}`);
    let newUserID = UsersList.length + 1;
    const newUser: UserType = { id: newUserID, ...newUserData };
    UsersList.push(newUser);
    res.status(201).json(newUser);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://${process.env.DB_HOST}:${process.env.PORT}`);
});
