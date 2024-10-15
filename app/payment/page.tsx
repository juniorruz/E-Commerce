import { getServerSession } from "next-auth"
import Payment from "../_components/payment"
import { authOptions } from "../_lib/auth"
import { redirect } from "next/navigation"

const PaymentPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect("/auth/login")
  }
  return <Payment />
}

export default PaymentPage
