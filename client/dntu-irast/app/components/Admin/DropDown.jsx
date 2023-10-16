import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FiMoreHorizontal } from 'react-icons/fi'
import DeleteCompany from "./DeleteCompany";
export default function DropDown({ isOpenDeleteModal, setIsOpenEditModal, setIsOpenDeleteModal }) {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                    >
                        <FiMoreHorizontal size={20} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" className="bg-gray-700 px-2 py-4 text-white w-40">
                    <DropdownItem onClick={() => setIsOpenEditModal(true)} key="edit" className="focus:outline-none hover:bg-gray-800 text-white">
                        Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => setIsOpenDeleteModal(true)} key="delete" className="focus:outline-none hover:bg-gray-800 text-red-500" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>

    );
}
