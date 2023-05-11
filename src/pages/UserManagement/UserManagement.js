import { Container } from "components/Container/Container"
import { UsersTable } from "./UserManagementData"
import { Heading } from "components/Common/Header/Heading"
const users=[
    {
     firstName:"lloyd",
     lastName:"perfection",
     email:"lloydperfect199@gmail.com",
     role:"Admin",
     gender:"Male"
    },
    {
        firstName:"tunmise",
        lastName:"adenuga",
        email:"tunmiperfect199@gmail.com",
        role:"SuperUser",
        gender:"Male"
       }
]
export const UserManagement=()=>{
return(
    <div className="p-4">
    <Container>
        <Heading>
            User Management
        </Heading>
        <p>List of users managed</p>
    <UsersTable users={users} />
    </Container>
    
    </div>
)
}