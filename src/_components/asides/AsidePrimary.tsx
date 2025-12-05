import Link from "next/link";
import { IconPrimary } from "../icons/IconsPrimary";
import { AsideNavData } from "@/_data/sample/NavData";
import ItemPrimary from "../items/ItemPrimary";


export default function AsidePrimary() {
  return (
    <aside className="w-20 bg-red-900 h-screen overflow-auto text-white">
        <ul className="w-full">
            {AsideNavData.map((i, key) => (
                <ItemPrimary 
                    key={key}
                    iconType={i.iconType} 
                    href={i.href} 
                    name={i.name} />
            ))}
        </ul>
    </aside>
  )
}
