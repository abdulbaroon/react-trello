"use server"
import { signInUser, signUpUser } from "@/firebase-config/firebase-methords";
import { updateProfile } from "firebase/auth";


const submitAction = async (formData, register) => {
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        if (register) {
            const userCredential = await signUpUser(email, password)
            if (userCredential) {
                updateProfile(userCredential.user, {
                    displayName: username,
                }
                );
                return true
            }
        } else {
            const userCredential = await signInUser(email, password)
            if (userCredential) {
                return true
            }
        }
    } catch (error) {
        console.log(error,"error")
        return false
    }
};

export default submitAction;