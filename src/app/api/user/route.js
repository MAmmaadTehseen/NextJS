import { NextResponse } from "next/server";
import User from "@/app/api/models/userModel";
import bcrypt from "bcrypt"
export async function POST(req) {
    try {


        let user = await req.json()
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt)
        let existingUser = await User.find({ email: user.email })
        existingUser = existingUser[0]
        console.log(existingUser)
        if (existingUser) {
            return NextResponse.json({ error: "user Exists" }, { status: 400 })
        }


        const createUser = await User.create({ name: user.name, email: user.email, password: hash, url: user.url })
        return NextResponse.json(createUser)
    }
    catch (error) {
        return NextResponse.json(error)

    }




}
export async function GET(req, res) {

    try {


        const fetchUser = await User.find({});
        return NextResponse.json(fetchUser)
    }
    catch (error) {
        return NextResponse.json("error getting user")
    }




}
