"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { useState } from "react";
export default function page() {
  const [contactModalOpen, setContactModalOpen] = useState(true);
  return (
    <div>
      <h1>hello</h1>
  <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Contact Info</DialogTitle>
        <DialogDescription>Add or edit a contact below</DialogDescription>
      </DialogHeader>


       {/* Modal body */}
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
    </form>

    <Button variant="ghost" onClick={()=> setContactModalOpen(false)}>close</Button>
    <Button>Save</Button>
    </DialogContent>


    <Button onClick={()=>setContactModalOpen(true)}>Open Contact Modal</Button>
  </Dialog>    
    </div>

  
  )
}
