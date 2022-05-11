import bcrypt from 'bcrypt';

const rounds = 10
const security = {
    encryptPassword: (async (password:string)=>{
        let hash = await bcrypt.hash(password, rounds);
        return hash;
    }),
    checkPassword: (async (input_password:string, real_password:string)=>{
        let result =  bcrypt.compare(input_password, real_password);
        return result;
    })
}   

export default security;