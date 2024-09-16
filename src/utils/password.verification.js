import bcrypt from "bcrypt";

export const checkHashedPassword = async (pasword, dataPassword) => {

    return await bcrypt.compare(pasword, dataPassword);

}
