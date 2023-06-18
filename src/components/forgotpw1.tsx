import Button from "@/components/Button";
import { AiOutlineUser } from "react-icons/ai";
import Link  from "next/link";



export default function Forgotpw1() {
    return (
    <div className="block w-auto items-center"><div className=" items-center "><h1 className="flex justify-center text-3xl font-bold py-11">Forgot password?</h1></div>
      
        <div className=" h-fit bg-white  block justify-center border-0 rounded-md px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Email Verification
            </h2>
            <h3 className="text-center">Enter your email ID to receive a verification code</h3>

          </div>
        <div>  </div>
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
             

            

              <div pb-5 >
             <Link href={'/forgotpw2'}><Button
              fullwidth
        intent={"primary"} >
       Receive Code
      </Button></Link>
      
              </div>
            </form>
  
           
          </div>
        </div>
        </div>
   
    )
  }