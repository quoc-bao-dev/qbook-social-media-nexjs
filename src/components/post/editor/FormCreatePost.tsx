"use client"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { usePostMutation, usePostQuery } from "@/queries/usePost"
import { useUpLoadMutation } from "@/queries/useUpload"
import { CreatePostBody, CreatePostBodyType } from "@/schemaValidation/post.chema"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Ellipsis, Images, MapPinPlus, Phone, SmilePlus, UserPlus, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"

const FormCreatePost = ({ onClose }: { onClose: () => void }) => {

    const [files, setFiles] = useState<File[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const uploadMutation = useUpLoadMutation()
    const postMutation = usePostMutation()
    const postQuery = usePostQuery()

    const { handleSubmit, register } = useForm<CreatePostBodyType>({
        resolver: zodResolver(CreatePostBody),
        defaultValues: {
            content: '',
            media: [],
            hashtags: [],
            visibility: 'public'
        }
    })

    const addImage = useCallback(() => {
        inputRef.current?.click()
    }, [])

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) { setFiles([...files, ...Array.from(e.target.files)]) }
    }

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index))
    }


    const extractHashtags = (content: string): { content: string, hashtags: string[] } => {
        const hashtags: string[] = []
        const regex = /\#[a-zA-Z0-9_]+/g
        const matches = content.match(regex)

        if (matches) {
            matches.forEach(match => {
                hashtags.push(match)
            })

            const newContent = content.replace(regex, '')
            return { content: newContent, hashtags }
        }

        return { content, hashtags }
    }

    const uploadFile = async () => {
        const body = new FormData()

        files.forEach(file => {
            body.append('files', file)
        })

        const result = await uploadMutation.mutateAsync(body)
        return result.data.data
    }



    const onSubmit = async (value: CreatePostBodyType) => {

        const media = await uploadFile()

        const { content, hashtags } = extractHashtags(value.content)

        const payload: CreatePostBodyType = { ...value, content, hashtags, media }

        await postMutation.mutateAsync(payload)

        postQuery.refetch()

        onClose()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader  >
                <DialogTitle>
                    <p className="text-xl font-semibold p-3 text-center">Create Post</p>
                </DialogTitle>
                <div className="">
                    <div className="flex items-start gap-3">
                        <Image src="https://images.unsplash.com/photo-1730407318819-6db610077721?q=80&w=1311&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User avatar" width={48} height={48} className="rounded-full object-cover overflow-hidden size-[48px]" />
                        <div className="">
                            <p className=" text-foreground font-semibold">Quoc Bao</p>
                            <div className="mt-1  px-3 rounded bg-muted">
                                <p className="font-semibold text-sm">Public</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogHeader>

            <Textarea className="mt-3" {...register('content')} placeholder="what do you think?" cols={30} rows={8} />

            <div className="mt-4 p-3 flex justify-between rounded-lg border border-accent">
                <p className="font-medium">Add to your post</p>
                <div className="flex gap-4">
                    <Images className="text-green-600" onClick={addImage} />
                    <UserPlus className="text-blue-600" />
                    <SmilePlus className="text-yellow-500" />
                    <MapPinPlus className="text-red-600" />
                    <Phone className="text-green-600" />
                    <Ellipsis />
                </div>
            </div>
            <input type="file" multiple className="hidden" ref={inputRef} onChange={onFileChange} />
            {files.length > 0 && (
                <div className="grid grid-cols-3 gap-2 my-4">
                    {files.map((file, index) => (
                        <div className="w-full h-[200px] rounded-lg relative overflow-hidden border border-muted" key={index}>
                            <X className="absolute right-2 top-2 cursor-pointer" onClick={() => removeFile(index)} />
                            <img src={URL.createObjectURL(file)} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <DialogFooter>
                <Button className="w-full" type="submit">Post</Button>
            </DialogFooter>
        </form>
    )
}

export default FormCreatePost