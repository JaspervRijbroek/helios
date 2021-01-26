import { hash as hashPassword} from "bcrypt"

(async () => {
    let hash = await hashPassword('Tester22!', 10);
    console.log(hash);
})();