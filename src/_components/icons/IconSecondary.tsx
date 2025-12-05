"use client"
import { BsBuildings } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { MdOutlineInfo } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

interface IconSecondaryInterface{
    iconType?: string, 
    css?: string
}

export const IconSecondary = ({ 
    iconType, 
    css="text-[1.7rem]" 
}: IconSecondaryInterface
) => {
    
    switch (iconType) {
        case 'phone':
            return <FaPhoneAlt className={css} />;
        case 'email':
            return <MdOutlineEmail className={css} />;
        case 'whatsapp':
            return <FaWhatsapp className={css} />;
        case 'facebook':
            return <FaFacebookF className={css} />;
        case 'address':
            return <BsBuildings className={css} />;
        case 'website':
            return <RiContactsLine className={css} />
        default:
            // Fallback icon if iconType doesn't match
            return <FiLink className={css} />;
    }

}