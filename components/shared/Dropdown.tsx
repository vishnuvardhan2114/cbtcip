import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
  

type DropdownProps = {
    value: string
    onChangeHandler:() => void
}

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewcategory] = useState('');

    const handleAddCategory = () => {
        createCategory({
          categoryName: newCategory.trim()
        })
        .then((category) => {
          setCategories((prevState) => [...prevState, category])
        })
    }

    useEffect(() => {
      const getCategories = async () => {
        const categoryList = await getAllCategories();

        categoryList && setCategories(categoryList as ICategory[])
      }

      getCategories();
    }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value} >
        <SelectTrigger className=" w-full bg-gray-50 h-[54px] placeholder:text-grey-500 rounded-full p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent !important">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
           {categories.length > 0 && categories.map((category) =>(
            <SelectItem key={category._id} value={category._id} className="py-3 cursor-pointer  focus:bg-indigo-50 p-regular-14" >
                {category.name}
            </SelectItem>
           ))}
           <AlertDialog>
                <AlertDialogTrigger className="p-medium-14 w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-indigo-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
                <AlertDialogContent className="bg-white ">
                    <AlertDialogHeader>
                    <AlertDialogTitle>New Category</AlertDialogTitle>
                    <AlertDialogDescription>
                       <Input type="text" placeholder="Category name" className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important mt-3" 
                          onChange={(e) => setNewcategory(e.target.value)}/>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => startTransition(handleAddCategory)} >Add</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </SelectContent>
    </Select>

  )
}

export default Dropdown