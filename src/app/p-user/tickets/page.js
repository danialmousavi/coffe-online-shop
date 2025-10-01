import Layout from '@/components/layouts/UserPanelLayout'
import Tickets from '@/components/templates/p-user/tickets/tickets'
import connectToDB from '@/configs/db'
import ticketModel from '@/models/Ticket';
import { userAuth } from '@/utils/userAuth';
import React from 'react'

export default async function page() {
    connectToDB();
    const user=await userAuth();
    const tickets=await ticketModel.find({user:user._id}).populate("department","title");
    
  return (
   <>
   <Layout>
    <Tickets tickets={JSON.parse(JSON.stringify(tickets))}/>
   </Layout>
   </>
  )
}
