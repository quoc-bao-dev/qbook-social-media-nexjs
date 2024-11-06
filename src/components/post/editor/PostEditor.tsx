import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Film, Images, Video } from "lucide-react"
import Image from "next/image"
import FormCreatePost from "./FormCreatePost"

const PostEditor = () => {
    return (
        <div className="p-4 rounded-lg shadow">
            <Dialog>

                <div className="flex gap-3 items-center">
                    <Image src="https://images.unsplash.com/photo-1730407318819-6db610077721?q=80&w=1311&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User avatar" width={48} height={48} className="rounded-full object-cover overflow-hidden size-[48px]" />
                    <DialogTrigger asChild>
                        <Input placeholder="what do you think?" className="w-full rounded-full px-4" value={"what do you think?"} />
                    </DialogTrigger>
                </div>
                <div className="mt-3 border-t border-gray-300 grid grid-cols-3 gap-4 pt-4">
                    <button className="flex gap-3 items-center justify-center w-full py-3 transition duration-200 rounded-lg hover:bg-muted ">
                        <Video /> <p className=" text-foreground" >Livestream</p>
                    </button>
                    <button className="flex gap-3 items-center justify-center w-full py-3 transition duration-200 rounded-lg  hover:bg-muted ">
                        <Images /><p className=" text-foreground" > Photo/Video</p>
                    </button>
                    <button className="flex gap-3 items-center justify-center w-full py-3 transition duration-200 rounded-lg  hover:bg-muted ">
                        <Film />  <p className=" text-foreground" >Reel</p>
                    </button>

                </div>
                <DialogContent>
                    <FormCreatePost />
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default PostEditor