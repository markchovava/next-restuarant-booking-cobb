"use client"
import { BsBuildings } from "react-icons/bs";
import { FaRegMap, FaRegRectangleList } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineInfo, MdOutlineGroups } from "react-icons/md";
import { FaRegUser, FaHome } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { IoRestaurantOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";


interface IconPrimaryInterface{
    iconType?: string, 
    css?: string
}

export const IconPrimary = ({ 
    iconType, 
    css="text-white lg:text-[2.2rem] text-[1.5rem]" 
}: IconPrimaryInterface
) => {
    
    switch (iconType) {
        case 'user':
            return <FaRegUser className={css} />;
        case 'home':
            return <FaHome className={css} />;
        case 'book-form':
            return <BiEditAlt className={css} />;
        case 'table':
            return <IoRestaurantOutline className={css} />;
        case 'group':
            return <MdOutlineGroups className={css} />;
        case 'map':
            return <FaRegMap className={css} />;
        case 'message':
            return <TiMessages className={css} />;
        case 'list':
            return <FaRegRectangleList className={css} />;
        case 'info':
            return <MdOutlineInfo className={css} />;
        case 'booking':
            return <IoBookOutline className={css} />;
        case 'dashboard':
            return <MdOutlineDashboard className={css} />;
        case 'building':
            return <BsBuildings className={css} />;
        case 'contact':
            return <RiContactsLine className={css} />
        default:
            return <FiLink className={css} />;
    }

}