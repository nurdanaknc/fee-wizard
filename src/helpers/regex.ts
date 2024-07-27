
export default function Regex(name: string, value: any) {
    if (name === "usernameRegex") {
       return /^[a-zA-Z0-9]*$/.test(value); // alphanumeric
    }
    else if (name === "passwordRegex") {
        return /^\d{6}$/.test(value); // 6 hane
    }

    else if (name === "emailRegex") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // email
    }
    
}
