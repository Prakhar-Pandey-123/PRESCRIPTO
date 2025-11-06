
import React from "react"
import { assets } from "../assets/assets"

const Footer=()=>{
 return(
    // grid-cols-[3fr_1fr_1fr]
// Custom grid template with 3 columns.
// The widths are proportional:. 1st column = 3fr (takes 3 parts). 2nd column = 1fr (1 part). 3rd column = 1fr (1 part)

    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* left section */}
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt=""></img>
        <p className="w-full md:w-2/3 text-gray-600 leading-6">The sole purpose of this website is to help patients to book an appointment with a specialized doctor in just one click, simplifying the entire process of scheduling a doctor’s appointment.</p>
            </div>
            {/* center section */}
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/* right section */}
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>8707522534</li>
                    <li>prakhar9704@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* copyright section */}
        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025- All rights reserved</p>
        </div>
    </div>
 )   
}
export default Footer